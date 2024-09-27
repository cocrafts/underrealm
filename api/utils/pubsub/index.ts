import { PubSub } from 'graphql-subscriptions';
import { broadcastMessage } from 'utils/ws';

class GeneralPubsub extends PubSub {
	async publish(triggerName: string, payload): Promise<void> {
		if (payload.type && !graphqlEventTypes.includes(payload.type)) {
			/**
			 * Handle general subscription, not graphql subscription
			 */
			broadcastMessage(payload);
		} else {
			/**
			 * Delay publish to support publish before subscribe, only for local development
			 */
			setTimeout(() => {
				super.publish(triggerName, payload);
			}, 100);
		}
	}
}

const _pubsub = new GeneralPubsub();

export const pubsub = {
	subscribe: async (topics: string | string[]) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return _pubsub.asyncIterator<any>(topics);
	},
	publish: async (topic: string, payload: unknown) => {
		return _pubsub.publish(topic, payload);
	},
};

const graphqlEventTypes = [
	'connection_init',
	'connection_terminate',
	'subscribe',
	'next',
	'complete',
	'connection_terminate',
];

export * from './utils';
