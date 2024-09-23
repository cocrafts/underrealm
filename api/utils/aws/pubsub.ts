import { PubSub } from 'graphql-subscriptions';

import { putItem } from './dynamo';
import { internalInvoke } from './lambda';

type TopicBuilder = (args?) => string;

export const publish = (topic, data) => {
	return internalInvoke('publisher', { topic, data });
};

export const subscribe = (topicBuilder: TopicBuilder) => {
	return async (
		{ id: subscriptionId },
		args,
		{ connectionId, domainName, ttl },
	) => {
		const topic = topicBuilder(args);

		await storeSubscription({
			domainName,
			connectionId,
			subscriptionId,
			topic,
			ttl,
		});

		return new PubSub().asyncIterator([topic]);
	};
};

const defaultTTL = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

export const storeSubscription = ({
	domainName,
	connectionId,
	subscriptionId,
	topic,
	ttl,
}) => {
	const topicPk = `WSS#${topic}`;
	const timeToLive = typeof ttl === 'number' ? ttl : defaultTTL;

	return putItem({
		pk: topicPk,
		sk: connectionId,
		gsi: connectionId,
		gsr: topicPk,
		gui: 'subscriptions',
		gur: new Date().toISOString(),
		ttl: timeToLive,
		domainName,
		subscriptionId,
	});
};

export const topicGenerator = {
	counterIncreased: () => 'counterIncreased',
	gameInvitation: ({ opponent }: { opponent: string }) =>
		`gameInvitation#${opponent}`,
	matchFind: ({ game, userId }: { game: 'MURG'; userId: string }) =>
		`matchFind#${game}#${userId}`,
	matchFound: ({ game, userId }: { game: 'MURG'; userId: string }) =>
		`matchFound#${game}#${userId}`,
	murgDuel: ({ duelId }: { duelId: string }) => `murgDuel#${duelId}`,
};
