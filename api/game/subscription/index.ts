import jwt from 'jsonwebtoken';
import { GameDuel, MatchFinding } from 'models/game';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

import { makeDuel } from '../duel';

const findMatch: SubscriptionResolvers['findMatch'] = {
	subscribe: async (_, { userId }, { connectionId }) => {
		const topic = topicGenerator.findMatch({ userId });

		/**
		 * store subscription before publish
		 */
		const subscribed = await pubsub.subscribe(topic);

		const opponent = await MatchFinding.findOneAndDelete(
			{ userId: { $ne: userId } },
			{ sort: { created_at: 1 } },
		);

		if (opponent) {
			const { userId: opponentId, pubsubTopic: opponentTopic } = opponent;
			const { config, history } = makeDuel('00001', userId, opponentId);
			const duel = await GameDuel.create({ config, history });
			logger.info('created new game duel', duel.id);

			await Promise.all([
				publishFindMatch(topic, userId, duel.id),
				publishFindMatch(opponentTopic, opponentId, duel.id),
			]);
		} else {
			await MatchFinding.create({
				userId: userId,
				pubsubTopic: topic,
				connectionId,
			});
		}

		return subscribed;
	},
};

export const GameSubscriptionResolvers = {
	findMatch,
};

export const publishFindMatch = async (
	topic: string,
	userId: string,
	duelId: string,
) => {
	try {
		const secret = configs.GAME_JWT_PRIVATE_KEY;
		const token = jwt.sign({ userId, duelId }, secret, {
			expiresIn: '12h',
			algorithm: 'RS256',
		});

		await pubsub.publish(topic, { findMatch: { id: duelId, jwt: token } });
		logger.info(`published findMatch with match id: ${duelId}`, { userId });
	} catch (error) {
		logger.error('failed to sign jwt and publish match', error);
	}
};
