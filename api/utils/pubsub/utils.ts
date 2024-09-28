export const topicGenerator = {
	counterIncreased: () => 'counterIncreased',
	findMatch: ({ userId }: { userId: string }) => `findMatch#${userId}`,
	duel: ({ duelId }: { duelId: string }) => `duel#${duelId}`,
};
