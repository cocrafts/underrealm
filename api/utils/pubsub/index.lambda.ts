/* eslint-disable @typescript-eslint/no-explicit-any */
import { postToConnection } from 'utils/aws/gateway';
import { globalContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

export * from './utils';

logger.info('Use Lambda Pubsub');

const registerTopic = async (topic: string, connectionId: string) => {
	const topicKey = `pubsub:topic#${topic}`;
	await redis.SADD(topicKey, connectionId);
	await redis.EXPIRE(topicKey, 60 * 60 * 24);
	const connectionKey = `pubsub:connection#${connectionId}`;
	await redis.SADD(connectionKey, topicKey);
};

export const pubsub = {
	subscribe: async (topics: string | string[]) => {
		const connectionId = globalContext.connectionId;
		if (typeof topics === 'string') {
			await registerTopic(topics, connectionId);
		} else {
			const registerPromises = topics.map(async (topic) => {
				await registerTopic(topic, globalContext.connectionId);
			});

			await Promise.all(registerPromises);
		}
	},
	publish: async (topic: string, payload: any) => {
		const connectionIds = await redis.SMEMBERS(topic);

		const sendPromises = connectionIds.map(async (cid) => {
			return await postToConnection(cid, payload);
		});

		await Promise.all(sendPromises);
	},
};
