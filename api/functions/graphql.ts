import {
	handlers,
	startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda';
import { graphqlContext } from 'utils/runtime';

import '../models';

import { apolloServer } from '../apollo';

export const handler = startServerAndCreateLambdaHandler(
	apolloServer,
	handlers.createAPIGatewayProxyEventV2RequestHandler(),
	{ context: graphqlContext },
);
