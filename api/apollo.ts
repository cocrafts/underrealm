import { ApolloServer } from '@apollo/server';

import { GameMutation, GameQuery, GameSubscription } from './game';
import typeDefs from './schema';

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers: {
		Query: {
			...GameQuery,
		},
		Mutation: {
			...GameMutation,
		},
		Subscription: {
			...GameSubscription,
		},
	},
});
