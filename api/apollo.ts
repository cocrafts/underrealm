import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import {
	ApolloServerErrorCode,
	unwrapResolverError,
} from '@apollo/server/errors';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { referred } from 'social/query/referral';
import { refereeUser } from 'user';
import { ClientError } from 'utils/errors';
import { logger } from 'utils/logger';
import type { Resolvers } from 'utils/types';

import {
	GameMutationResolvers,
	GameQueryResolvers,
	GameSubscriptionResolvers,
} from './game';
import { SocialMutationResolvers, SocialQueryResolvers } from './social';
import { UserQueryResolvers, UserSubscriptionResolvers } from './user';

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const resolvers: Resolvers = {
	Query: {
		...GameQueryResolvers,
		...SocialQueryResolvers,
		...UserQueryResolvers,
	},
	Mutation: {
		...GameMutationResolvers,
		...SocialMutationResolvers,
	},
	Subscription: {
		...UserSubscriptionResolvers,
		...GameSubscriptionResolvers,
	},
	Profile: {
		referred,
	},
	ReferralHistory: {
		refereeUser,
	},
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

export const apolloServer = new ApolloServer({
	schema,
	formatError: (fError, error) => {
		const isServerIntentError =
			fError.extensions.code === ApolloServerErrorCode.INTERNAL_SERVER_ERROR;
		const isLabeledClientError =
			unwrapResolverError(error) instanceof ClientError;

		if (isServerIntentError && !isLabeledClientError) {
			logger.error(unwrapResolverError(error));
		}

		return fError;
	},
});
