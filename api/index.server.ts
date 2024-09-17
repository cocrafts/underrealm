import 'utils/loadEnv';

logger.info('Underrealm API is running...');

import http from 'http';

import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';
import { graphqlContext as context } from 'utils/runtime';

import './models';

import { apolloServer as apollo } from './apollo';

const app = express();
const httpServer = http.createServer(app);
apollo.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));

await Promise.all([apollo.start(), mongoose.connect(configs.MONGO_URI)]);

app.use(cors());
app.use(express.json());
app.use('/graphql', expressMiddleware(apollo, { context }));

const port = configs.PORT;
httpServer.listen({ port }, () => {
	logger.info(`🚀  Server ready at port ${port}`);
});
