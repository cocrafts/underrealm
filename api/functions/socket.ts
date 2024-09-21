import type { APIGatewayProxyWebsocketHandlerV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import graphqlHandler from './graphql';

const handler: APIGatewayProxyWebsocketHandlerV2 = async (event, context) => {
	switch (event.requestContext.routeKey) {
		case '$connect': {
			return { statusCode: StatusCodes.OK };
		}
		case '$disconnect': {
			return { statusCode: StatusCodes.OK };
		}
		case 'graphql': {
			await graphqlHandler(event as never, context, () => ({}));
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

export default handler;
