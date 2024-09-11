import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import type { Resolvers } from 'types/graphql';
import { UserQueryResolver } from 'user';

import {
	GameMutationResolvers,
	GameQueryResolvers,
	GameSubscription,
} from './game';
import { SocialMutationResolvers, SocialQueryResolvers } from './social';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers: Resolvers = {
	Query: {
		...GameQueryResolvers,
		...SocialQueryResolvers,
		...UserQueryResolver,
	},
	Mutation: {
		...GameMutationResolvers,
		...SocialMutationResolvers,
	},
	Subscription: {
		...GameSubscription,
	},
};

export const apolloServer = new ApolloServer({ typeDefs, resolvers });
