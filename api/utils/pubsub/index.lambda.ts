/* eslint-disable @typescript-eslint/no-explicit-any */
import { postToConnection } from 'utils/aws/gateway';
import { globalContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

export * from './utils';

logger.info('Use Lambda Pubsub');

const DAY_IN_SECONDS = 60 * 60 * 24;

/**
 * A topic key stores list of subscription keys.
 * A subscription key stores a string value [connectionId, ...topicKeys].join(".").
 */
export const pubsub = {
	subscribe: async (topics: string | string[]) => {
		const { connectionId, subscriptionId } = globalContext;

		if (typeof topics === 'string') {
			const topic = topics;
			await Promise.all([
				registerTopic(topic, subscriptionId),
				storeSubscription(subscriptionId, connectionId, [topic]),
			]);
		} else {
			const registerPromises = topics.map(async (topic) => {
				await registerTopic(topic, subscriptionId);
			});

			await Promise.all([
				...registerPromises,
				storeSubscription(subscriptionId, connectionId, topics),
			]);
		}
	},
	unsubscribe: async (subscriptionId: string) => {
		const subscriptionKey = constructSubscriptionKey(subscriptionId);
		const subscription = await redis.GET(subscriptionKey);
		if (!subscription || !subscription.includes('.'))
			throw Error('Subscription not found');

		const [connectionId, ...topicKeys] = subscription.split('.');

		const unregisterPromises = topicKeys.map(async (topicKey) => {
			return await unregisterTopic(topicKey, subscriptionId);
		});

		await Promise.all([
			...unregisterPromises,
			redis.DEL(subscriptionKey),
			postToConnection(connectionId, {
				id: subscriptionId,
				type: 'complete',
			}),
		]);
	},
	publish: async (topic: string, payload: any) => {
		const subscriptionKeys = await redis.SMEMBERS(topic);

		const publishPromises = subscriptionKeys.map(async (subscriptionKey) => {
			const subscription = await redis.GET(subscriptionKey);
			if (!subscription || !subscription.includes('.'))
				throw Error('Subscription not found');

			const connectionId = subscription.split('.')[0];
			const subscriptionId = subscriptionKey.split('#')[1];

			return await postToConnection(connectionId, {
				id: subscriptionId,
				type: 'next',
				data: payload,
			});
		});

		await Promise.all(publishPromises);
	},
};

const registerTopic = async (topic: string, subscriptionId: string) => {
	const topicKey = constructTopicKey(topic);
	const subscriptionKey = constructSubscriptionKey(subscriptionId);

	await Promise.all([
		redis.SADD(topicKey, subscriptionKey),
		redis.EXPIRE(topicKey, DAY_IN_SECONDS),
	]);
};

const unregisterTopic = async (topicKey: string, subscriptionId: string) => {
	const subscriptionKey = constructSubscriptionKey(subscriptionId);

	await redis.SREM(topicKey, subscriptionKey);
};

const storeSubscription = async (
	subscriptionId: string,
	connectionId: string,
	topics: string[],
) => {
	const subscriptionKey = constructSubscriptionKey(subscriptionId);
	const topicKeys = topics.map(constructTopicKey);
	const subscriptionValue = [connectionId, ...topicKeys].join('.');

	await redis.SET(subscriptionKey, subscriptionValue, { EX: DAY_IN_SECONDS });
};

const constructTopicKey = (topic: string) => {
	return `pubsub:topic:${topic}`;
};

const constructSubscriptionKey = (subscriptionId: string) => {
	return `pubsub:subscription#${subscriptionId}`;
};
