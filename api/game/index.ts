import type { Resolver } from 'utils/runtime';

import { acceptGame } from './mutation/accept';
import { inviteGame } from './mutation/invite';
import { stopMatchFind } from './mutation/matching';
import { cardDuel, cardDuelHistory, cardDuelPlaying } from './query/duel';
import { gameInvitations, gameJwt } from './query/invitation';

const greeting: Resolver<never, string> = async (root, args, { user }) => {
	const userId = user.id || 'Stranger';
	return `Welcome ${userId}!`;
};

export { GameSubscription } from './subscription';

export const GameQuery = {
	greeting,
	gameJwt,
	gameInvitations,
	cardDuelHistory,
	cardDuelPlaying,
	cardDuel,
};

export const GameMutation = {
	inviteGame,
	acceptGame,
	stopMatchFind,
};
