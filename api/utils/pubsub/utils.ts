export const topicGenerator = {
	counterIncreased: () => 'counterIncreased',
	findMatch: ({ userId }: { userId: string }) => `findMatch#${userId}`,
	match: ({ matchId }: { matchId: string }) => `match#${matchId}`,
};
