import type { Disposable } from 'graphql-ws';

export const ApolloServerPluginDrainWsServer = (wsCleanup: Disposable) => {
	return {
		async serverWillStart() {
			return {
				async drainServer() {
					await wsCleanup.dispose();
				},
			};
		},
	};
};
