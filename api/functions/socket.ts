import type {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyWebsocketHandlerV2,
} from 'aws-lambda';
import { parse, subscribe, validate } from 'graphql';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import { postToConnection } from 'utils/aws/gateway';
import { configs } from 'utils/config';
import { globalContext } from 'utils/context/index.lambda';
import { logger } from 'utils/logger';
import { redis } from 'utils/redis';

import { schema } from '../apollo';

const initPromises = [redis.connect(), mongoose.connect(configs.MONGO_URI)];

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (
	event,
	context,
	callback,
) => {
	await Promise.all(initPromises);

	switch (event.requestContext.routeKey) {
		case '$connect': {
			logger.info('connect', event.requestContext);
			return ok();
		}
		case '$disconnect': {
			logger.info('disconnect', event.requestContext);
			return ok();
		}
		case '$default': {
			const connectionId = event.requestContext.connectionId;

			try {
				const result = await handleGraphqlSubscription(
					event,
					context,
					callback,
				);
				if (result) return result;
			} catch (error) {
				await postToConnection(connectionId, {
					payload: { errors: [(error as Error).message] },
					type: 'error',
				});
			}

			break;
		}
		default: {
			return {
				statusCode: StatusCodes.BAD_REQUEST,
				body: JSON.stringify({
					message: 'invalid websocket route',
				}),
			};
		}
	}

	return ok();
};

const handleGraphqlSubscription: APIGatewayProxyWebsocketHandlerV2 = async (
	event,
) => {
	logger.info('Handle event from', event.requestContext);
	const connectionId = event.requestContext.connectionId;
	globalContext.connectionId = connectionId;

	if (!event.body) return ok();

	const operation = JSON.parse(event.body);

	if (operation.type === 'connection_init') {
		await postToConnection(connectionId, { type: 'connection_ack' });
		return ok();
	} else if (operation.type === 'stop') {
		return ok();
	}

	const { query, variables, operationName } = operation.payload;
	const document = parse(query);
	const validationErrors = validate(schema, document);
	if (validationErrors.length > 0) {
		await postToConnection(connectionId, {
			payload: { errors: validationErrors },
			type: 'error',
		});
		return ok();
	}

	try {
		await subscribe({
			document,
			schema,
			rootValue: {},
			operationName: operationName,
			variableValues: variables,
			contextValue: {},
		});
	} catch (err) {
		await postToConnection(connectionId, {
			id: operation.id,
			payload: err,
			type: 'error',
		});
	}

	return ok();
};

const ok = (
	result?: Omit<APIGatewayProxyStructuredResultV2, 'statusCode'>,
): APIGatewayProxyStructuredResultV2 => {
	return { ...result, statusCode: StatusCodes.OK };
};
