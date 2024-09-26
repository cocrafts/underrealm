import { GameMatch, MatchFinding } from 'models/game';
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
			const duel = makeDuel('00001', userId, opponentId);
			const gameMatch = await GameMatch.create(duel);

			await Promise.all([
				pubsub.publish(topic, { findMatch: { id: gameMatch.id } }),
				pubsub.publish(opponentTopic, { findMatch: { id: gameMatch.id } }),
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
