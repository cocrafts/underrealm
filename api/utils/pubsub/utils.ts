export const graphqlEventTypes = [
	'connection_init',
	'connection_terminate',
	'subscribe',
	'next',
	'complete',
	'connection_terminate',
];

export const topicGenerator = {
	counterIncreased: () => 'counterIncreased',
	findMatch: ({ userId }: { userId: string }) => `findMatch#${userId}`,
	duel: ({ duelId }: { duelId: string }) => `duel#${duelId}`,
};
