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
