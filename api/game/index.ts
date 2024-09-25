import type { QueryResolvers } from 'utils/types';

import { cardDuel, cardDuelHistory, cardDuelPlaying } from './query/duel';

const greeting: QueryResolvers['greeting'] = async (root, args, { user }) => {
	const userId = user.bindingId || 'Stranger';
	return `Welcome ${userId}!`;
};

export { GameSubscriptionResolvers } from './subscription';

export const GameQueryResolvers = {
	greeting,
	cardDuelHistory,
	cardDuelPlaying,
	cardDuel,
};

export const GameMutationResolvers = {};
