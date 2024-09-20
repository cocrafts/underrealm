import { readFileSync } from 'fs';

import { ApolloServer } from '@apollo/server';
import {
	ApolloServerErrorCode,
	unwrapResolverError,
} from '@apollo/server/errors';
import type { Resolvers } from 'types/graphql';
import { ClientError } from 'utils/errors';
import { logger } from 'utils/logger';

import {
	GameMutationResolvers,
	GameQueryResolvers,
	GameSubscription,
} from './game';
import { SocialMutationResolvers, SocialQueryResolvers } from './social';
import { UserQueryResolver } from './user';

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

export const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
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
