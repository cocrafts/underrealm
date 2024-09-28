import jwt from 'jsonwebtoken';
import { GameMatch, MatchFinding } from 'models/game';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

import { makeDuel } from '../duel';

const findMatch: SubscriptionResolvers['findMatch'] = {
	subscribe: async (_, { userId }) => {
		const topic = topicGenerator.findMatch({ userId });

		/**
		 * store subscription before publish
		 */
		const subscribed = await pubsub.subscribe(topic);

		const opponent = await MatchFinding.findOneAndDelete({
			userId: { $ne: userId },
		});

		if (opponent) {
			const { userId: opponentId, pubsubTopic: opponentTopic } = opponent;
			const { config, history } = makeDuel('00001', userId, opponentId);
			const gameMatch = await GameMatch.create({ config, history });

			await Promise.all([
				publishFindMatch(topic, userId, gameMatch.id),
				publishFindMatch(opponentTopic, opponentId, gameMatch.id),
			]);

			logger.info(`published findMatch with match id: ${gameMatch.id}`, {
				userId,
				opponentId,
			});
		} else {
			await MatchFinding.create({ userId: userId, pubsubTopic: topic });
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
	matchId: string,
) => {
	const secret = configs.GAME_JWT_PRIVATE_KEY;
	const token = jwt.sign({ userId, matchId }, secret, {
		expiresIn: '12h',
		algorithm: 'RS256',
	});

	await pubsub.publish(topic, { findMatch: { id: matchId, jwt: token } });
};
