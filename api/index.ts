/* eslint-disable react-hooks/rules-of-hooks */
logger.info('Underrealm API is running...');

import { createServer } from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainWsServer } from 'utils/apollo';
import { GraphQLLoggingMiddleware } from 'utils/common';
import { configs } from 'utils/config';
import { graphqlContext as context } from 'utils/context';
import { logger } from 'utils/logger';
import { WebSocketServer } from 'ws';

import './models';
import './utils/redis';

import { redis } from './utils/redis';
import { apolloServer as apollo, schema } from './apollo';
import { mongo } from './models';

const app = express();
const http = createServer(app);
const ws = new WebSocketServer({ server: http, path: '/subscriptions' });

const wsCleanup = useServer({ schema }, ws);

// Proper shutdown for the HTTP server.
apollo.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer: http }));
// Proper shutdown for the WebSocket server.
apollo.addPlugin(ApolloServerPluginDrainWsServer(wsCleanup));

await Promise.all([apollo.start(), redis.connect(), mongo.connect()]);

app.use(cors());
app.use(express.json());
app.use(GraphQLLoggingMiddleware());
app.use('/graphql', expressMiddleware(apollo, { context }));

const port = configs.PORT;
http.listen({ port }, () => {
	logger.info(`🚀 Server ready at port ${port}`);
});
