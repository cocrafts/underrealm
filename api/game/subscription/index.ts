import { subscribe, topicGenerator } from 'aws/pubsub';

export const GameSubscription = {
	gameInvitation: {
		subscribe: subscribe(topicGenerator.gameInvitation),
	},
	matchFind: {
		subscribe: subscribe(topicGenerator.matchFind),
	},
	matchFound: {
		subscribe: subscribe(topicGenerator.matchFound),
	},
};


