import {
	handlers,
	startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';
import mongoose from 'mongoose';
import { configs } from 'utils/config';
import { graphqlContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

import '../models';

import { apolloServer } from '../apollo';

logger.info('API is running');

const initPromises = [redis.connect(), mongoose.connect(configs.MONGO_URI)];

const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

const waitForInit = async () => {
	await Promise.all(initPromises);
};

export const handler = startServerAndCreateLambdaHandler(
	apolloServer,
	requestHandler,
	{ context: graphqlContext, middleware: [waitForInit] },
);
