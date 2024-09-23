/* eslint-disable @typescript-eslint/no-explicit-any */
import { type PubSubEngine } from 'graphql-subscriptions';
import { postToConnection } from 'utils/aws/gateway';
import { globalContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

export * from './utils';

class LambdaPubsub implements PubSubEngine {
	public asyncIterator<T>(triggers: string | string[]): AsyncIterable<T> {
		return {
			[Symbol.asyncIterator]: () => {
				return {
					next: async () => {
						if (typeof triggers === 'string') {
							await this.registerTopic(triggers, globalContext.connectionId);
						} else {
							const registerPromises = triggers.map(async (topic) => {
								await this.registerTopic(topic, globalContext.connectionId);
							});

							await Promise.all(registerPromises);
						}

						return Promise.resolve({ done: true, value: null });
					},
				};
			},
		};
	}

	public async publish(triggerName: string, payload: any): Promise<void> {
		const connectionIds = await redis.SMEMBERS(triggerName);

		const sendPromises = connectionIds.map(async (cid) => {
			return await postToConnection(cid, payload);
		});

		await Promise.all(sendPromises);
	}

	public async subscribe(triggerName: string, onMessage: any): Promise<number> {
		if (onMessage) {
			logger.warn('onMessage is ignored by Lambda pubsub');
		}
		await this.registerTopic(triggerName, globalContext.connectionId);

		return 0;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public unsubscribe(subId: number) {
		throw Error('unsubscribe is not supported in lambda runtime');
	}

	private async registerTopic(topic: string, connectionId: string) {
		const topicKey = `pubsub:topic#${topic}`;
		await redis.SADD(topicKey, connectionId);
		await redis.EXPIRE(topicKey, 60 * 60 * 24);
		const connectionKey = `pubsub:connection#${connectionId}`;
		await redis.SADD(connectionKey, topicKey);
	}
}

export const pubsub = new LambdaPubsub();
