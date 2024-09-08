import { graphqlContext } from './utils/runtime';
import { GameMutation, GameQuery, GameSubscription } from './game';
import typeDefs from './schema';

export const resolvers = {
	GameQuery,
	GameMutation,
	GameSubscription,
};

export const apolloConfigs = {
	typeDefs,
	resolvers,
	context: graphqlContext,
};
