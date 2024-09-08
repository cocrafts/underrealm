import { subscribe, topicGenerator } from 'aws/pubsub';
import type { SubscriptionResolvers } from 'types/graphql';

const gameInvitation: SubscriptionResolvers['gameInvitation'] = {
	subscribe: subscribe(topicGenerator.gameInvitation) as never,
};

const matchFind: SubscriptionResolvers['matchFind'] = {
	subscribe: subscribe(topicGenerator.matchFind) as never,
};

const matchFound: SubscriptionResolvers['matchFound'] = {
	subscribe: subscribe(topicGenerator.matchFound) as never,
};

export const GameSubscription = {
	gameInvitation,
	matchFind,
	matchFound,
};
