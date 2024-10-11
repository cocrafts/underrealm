import {
	ApiGatewayManagementApiClient,
	PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';

import { wsEndpoint } from './utils';

export const wsClient = new ApiGatewayManagementApiClient({
	region: configs.REGION,
	endpoint: wsEndpoint,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postToConnection = async (connectionId: string, payload: any) => {
	try {
		return await wsClient.send(
			new PostToConnectionCommand({
				ConnectionId: connectionId,
				Data: JSON.stringify(payload),
			}),
		);
	} catch (error) {
		// GoneException, PayloadTooLargeException
		logger.error('Can not post to connection', { connectionId, error });
	}
};
