import type { APIGatewayProxyWebsocketHandlerV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

export const handler: APIGatewayProxyWebsocketHandlerV2 = async (event) => {
	switch (event.requestContext.routeKey) {
		case '$connect': {
			return { statusCode: StatusCodes.OK };
		}
		case '$disconnect': {
			return { statusCode: StatusCodes.OK };
		}
		case 'graphql': {
			return { statusCode: StatusCodes.OK };
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
};
