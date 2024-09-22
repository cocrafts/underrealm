import {
	handlers,
	startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';
import { graphqlContext } from 'utils/context';
import { logger } from 'utils/logger';

import '../models';

import { apolloServer } from '../apollo';

logger.info('API is running');

export const handler = startServerAndCreateLambdaHandler(
	apolloServer,
	handlers.createAPIGatewayProxyEventV2RequestHandler(),
	{ context: graphqlContext },
);
