import {
	ApiGatewayManagementApiClient,
	PostToConnectionCommand,
} from '@aws-sdk/client-apigatewaymanagementapi';
import { configs } from 'utils/config';

import { wsEndpoint } from './utils';

export const wsClient = new ApiGatewayManagementApiClient({
	region: configs.REGION,
	endpoint: wsEndpoint,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postToConnection = async (connectionId: string, payload: any) => {
	return await wsClient.send(
		new PostToConnectionCommand({
			ConnectionId: connectionId,
			Data: JSON.stringify(payload),
		}),
	);
};
