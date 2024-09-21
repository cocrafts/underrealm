import {
	handlers,
	startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';
import { logger } from 'utils/logger';
import { graphqlContext } from 'utils/runtime';

import '../models';

import { apolloServer } from '../apollo';

logger.info('API is running');

export const handler = startServerAndCreateLambdaHandler(
	apolloServer,
	handlers.createAPIGatewayProxyEventV2RequestHandler(),
	{ context: graphqlContext },
);
