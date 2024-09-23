import type { ContextFunction } from '@apollo/server';
import type { LambdaContextFunctionArgument } from '@as-integrations/aws-lambda';
import type { handlers } from '@as-integrations/aws-lambda';
import type {
	APIGatewayProxyEventV2,
	APIGatewayProxyStructuredResultV2,
} from 'aws-lambda';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';

import type { ApiContext } from './graphql';
import { resolveUniversalContext } from './graphql';

type LambdaIntegrationContext = LambdaContextFunctionArgument<
	handlers.RequestHandler<
		APIGatewayProxyEventV2,
		APIGatewayProxyStructuredResultV2
	>
>;

/**
 * Context wrapper for Lambda runtime
 */
export const graphqlContext: ContextFunction<
	[LambdaIntegrationContext],
	ApiContext
> = async ({ event }) => {
	logger.info(event.headers);
	const authHeader = event.headers['authorization'];
	const isIntrospection = event.body.includes('Introspection');

	const context = await resolveUniversalContext({
		authHeader,
		isIntrospection,
	});

	return context;
};

if (configs.RUNTIME !== 'lambda')
	throw Error('global context is only used by Lambda runtime');

type GlobalContext = {
	/**
	 * userId is set by graphql context for each request
	 */
	userId?: string;
	/**
	 * connectionId is set by websocket handler for each ws event
	 */
	connectionId?: string;
};

/**
 * This global context is used as request context as Lambda runtime serves only 1 request at a time
 */
export const globalContext: GlobalContext = {};
