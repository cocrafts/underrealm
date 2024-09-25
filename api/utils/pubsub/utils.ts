export const topicGenerator = {
	counterIncreased: () => 'counterIncreased',
	findMatch: ({ userId }: { userId: string }) => `findMatch#${userId}`,
	murgDuel: ({ duelId }: { duelId: string }) => `murgDuel#${duelId}`,
};
