import { subscribe, topicGenerator } from 'utils/aws/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

const gameInvitation: SubscriptionResolvers['gameInvitation'] = {
	subscribe: subscribe(topicGenerator.gameInvitation) as never,
};

const matchFind: SubscriptionResolvers['matchFind'] = {
	subscribe: subscribe(topicGenerator.matchFind) as never,
};

const matchFound: SubscriptionResolvers['matchFound'] = {
	subscribe: subscribe(topicGenerator.matchFound) as never,
};

export const GameSubscriptionResolvers = {
	gameInvitation,
	matchFind,
	matchFound,
};
