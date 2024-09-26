import {
	handlers,
	startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';
import { graphqlContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

import '../models';

import { apolloServer } from '../apollo';
import { mongo } from '../models';

logger.info('API is running');

const initPromises = [redis.connect(), mongo.connect()];

const requestHandler = handlers.createAPIGatewayProxyEventV2RequestHandler();

const waitForInit = async () => {
	await Promise.all(initPromises);
};

export const handler = startServerAndCreateLambdaHandler(
	apolloServer,
	requestHandler,
	{ context: graphqlContext, middleware: [waitForInit] },
);
