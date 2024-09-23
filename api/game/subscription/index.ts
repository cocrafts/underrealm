import { pubsub, topicGenerator } from 'utils/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

const gameInvitation: SubscriptionResolvers['gameInvitation'] = {
	subscribe: async (_, { opponent }) => {
		return await pubsub.subscribe(topicGenerator.gameInvitation({ opponent }));
	},
};

const matchFind: SubscriptionResolvers['matchFind'] = {
	subscribe: async (_, { game, userId }) => {
		return await pubsub.subscribe(topicGenerator.matchFind({ game, userId }));
	},
};

const matchFound: SubscriptionResolvers['matchFound'] = {
	subscribe: async (_, { game, userId }) => {
		return await pubsub.subscribe(topicGenerator.matchFound({ game, userId }));
	},
};

export const GameSubscriptionResolvers = {
	gameInvitation,
	matchFind,
	matchFound,
};
