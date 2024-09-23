import { PubSub } from 'graphql-subscriptions';

const localPubsub = new PubSub();

export const pubsub = {
	subscribe: async (topics: string | string[]) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return localPubsub.asyncIterator<any>(topics);
	},
	publish: async (topic: string, payload: unknown) => {
		return localPubsub.publish(topic, payload);
	},
};

export * from './utils';
