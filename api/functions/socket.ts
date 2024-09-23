import type {
	APIGatewayProxyStructuredResultV2,
	APIGatewayProxyWebsocketHandlerV2,
} from 'aws-lambda';
import { parse, subscribe, validate } from 'graphql';
import { StatusCodes } from 'http-status-codes';
import { mongo } from 'models';
import { postToConnection } from 'utils/aws/gateway';
import { globalContext } from 'utils/context/index.lambda';
import { redis } from 'utils/redis';

import { schema } from '../apollo';

const initPromises = [redis.connect(), mongo.connect()];

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (
	event,
	context,
	callback,
) => {
	await Promise.all(initPromises);
	const connectionId = event.requestContext.connectionId;

	try {
		switch (event.requestContext.routeKey) {
			case '$connect': {
				const result = await handleConnect(event, context, callback);
				if (result) return result;
				break;
			}
			case '$disconnect': {
				const result = await handleDisconnect(event, context, callback);
				if (result) return result;
				break;
			}
			case '$default': {
				const result = await handleGraphqlSubscription(
					event,
					context,
					callback,
				);
				if (result) return result;
				break;
			}
			default: {
				return {
					statusCode: StatusCodes.BAD_REQUEST,
					body: JSON.stringify({ message: 'invalid websocket route' }),
				};
			}
		}
	} catch (error) {
		await postToConnection(connectionId, {
			payload: { errors: [(error as Error).message] },
			type: 'error',
		});
	}
	return ok();
};

const handleConnect: APIGatewayProxyWebsocketHandlerV2 = async (event) => {
	const subprotocols: string[] =
		event['multiValueHeaders']?.['Sec-WebSocket-Protocol'];

	if (
		subprotocols &&
		subprotocols.length > 0 &&
		subprotocols.indexOf('graphql-transport-ws') !== -1
	) {
		return ok({
			headers: { 'Sec-WebSocket-Protocol': 'graphql-transport-ws' },
		});
	}

	return ok();
};

const handleDisconnect: APIGatewayProxyWebsocketHandlerV2 = async () => {
	return ok();
};

const handleGraphqlSubscription: APIGatewayProxyWebsocketHandlerV2 = async (
	event,
) => {
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
