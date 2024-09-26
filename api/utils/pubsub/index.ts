import { PubSub } from 'graphql-subscriptions';

class WrappedPubsub extends PubSub {
	/**
	 * Delay publish to support publish before subscribe, only for local development
	 */
	async publish(triggerName: string, payload): Promise<void> {
		setTimeout(() => {
			super.publish(triggerName, payload);
		}, 100);
	}
}

const localPubsub = new WrappedPubsub();

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
