import http from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { addAliases } from 'module-alias';
import { graphqlContext as context } from 'utils/runtime';

import { apolloServer as apollo } from './apollo';

dotenv.config();

addAliases({ 'apollo-server-lambda': 'apollo-server-express' });

const app = express();
const httpServer = http.createServer(app);
apollo.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));

await apollo.start();

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(apollo, { context }));

const port = Number(process.env.PORT) || 3005;

httpServer.listen({ port }, () => {
	console.log(`🚀  Server ready at port ${port}`);
});
