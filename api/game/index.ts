import type { QueryResolvers } from 'types/graphql';

import { acceptGame } from './mutation/accept';
import { inviteGame } from './mutation/invite';
import { stopMatchFind } from './mutation/matching';
import { cardDuel, cardDuelHistory, cardDuelPlaying } from './query/duel';
import { gameInvitations, gameJwt } from './query/invitation';

const greeting: QueryResolvers['greeting'] = async (root, args, { user }) => {
	const userId = user.id || 'Stranger';
	return `Welcome ${userId}!`;
};

export { GameSubscription } from './subscription';

export const GameQueryResolvers = {
	greeting,
	gameJwt,
	gameInvitations,
	cardDuelHistory,
	cardDuelPlaying,
	cardDuel,
};

export const GameMutationResolvers = {
	inviteGame,
	acceptGame,
	stopMatchFind,
};
