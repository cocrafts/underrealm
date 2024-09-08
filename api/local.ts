import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express from 'express';
import { addAliases } from 'module-alias';

import { apolloConfigs } from './index';

dotenv.config();

addAliases({ 'apollo-server-lambda': 'apollo-server-express' });

export const config = async () => {
	const app = express();
	const apolloServer = new ApolloServer(apolloConfigs);
	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
		path: '/graphql',
		cors: {
			origin: '*',
			credentials: true,
		},
	});

	return app;
};

config().then((app) => {
	const port = process.env.PORT || 3005;
	app.listen(port, () => {
		console.log(`API is listening on port ${port}`);
	});
});
