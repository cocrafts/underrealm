import type { DefaultOptions, Operation } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { extractJwt } from 'utils/lib/auth';

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const basicLink = new HttpLink({ uri: STORMGATE_API_ENDPOINT, fetch });

const authLink = setContext(async (_, { headers: originalHeaders }) => {
	const token = await extractJwt();
	const headers = {
		'client-key': STORMGATE_CLIENT_KEY,
		...originalHeaders,
	};

	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	return { headers };
});

const httpLink = authLink.concat(basicLink);

const socketLink = new WebSocketLink({
	uri: SOCKET_URI,
	options: { reconnect: true },
});

const splitter = ({ query }: Operation) => {
	const definition = getMainDefinition(query);
	return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	);
};

export const memoryCache = new InMemoryCache();

export const graphQlClient = new ApolloClient({
	link: split(splitter, socketLink, httpLink),
	cache: memoryCache,
	defaultOptions,
});

export * from './sdk';
