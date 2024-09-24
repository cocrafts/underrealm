import type { DefaultOptions, Operation } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { extractJwt } from 'utils/lib/auth';

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'cache-and-network',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const httpLink = new HttpLink({ uri: STORMGATE_API_ENDPOINT, fetch });

const authLink = setContext(async (_, { headers: originalHeaders }) => {
	const token = await extractJwt();
	const headers = {
		...originalHeaders,
		Authorization: token ? `Bearer ${token}` : '',
	};

	return { headers };
});

const socketLink = new GraphQLWsLink(
	createClient({
		url: SOCKET_URI,
		on: { connected: () => console.log('GraphQL Subscription connected') },
		connectionParams: async () => {
			const token = await extractJwt();
			return { headers: { Authorization: token ? `Bearer ${token}` : '' } };
		},
	}),
);

const splitter = ({ query }: Operation) => {
	const definition = getMainDefinition(query);
	return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	);
};

export const memoryCache = new InMemoryCache();

export const graphQlClient = new ApolloClient({
	link: split(splitter, socketLink, authLink.concat(httpLink)),
	cache: memoryCache,
	defaultOptions,
});

export * from './sdk';
