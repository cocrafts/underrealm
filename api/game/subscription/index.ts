import { pubsub, topicGenerator } from 'utils/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

const findMatch: SubscriptionResolvers['matchFind'] = {
	subscribe: async (_, { userId }) => {
		return await pubsub.subscribe(topicGenerator.findMatch({ userId }));
	},
};

export const GameSubscriptionResolvers = {
	findMatch,
};
