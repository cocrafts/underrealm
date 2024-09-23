import dotenv from 'dotenv';

import {
	APIEnvs,
	constructDomainName,
	defaultLambdaConfigs,
	zoneId,
} from './shared';

export const constructWebsocketAPI = () => {
	dotenv.config({ path: `api/.env.${$app.stage}` });

	const domainName = constructDomainName('websocket', $app.stage);

	const wsAPI = new sst.aws.ApiGatewayWebSocket('websocket', {
		domain: {
			name: domainName,
			dns: sst.aws.dns({ zone: zoneId }),
		},
	});

	const socket = new sst.aws.Function('socket', {
		handler: 'api/functions/socket.handler',
		environment: { ...APIEnvs() },
		...defaultLambdaConfigs($app.stage),
	});

	wsAPI.route('$connect', socket.arn as never);
	wsAPI.route('$disconnect', socket.arn as never);
	wsAPI.route('graphql', socket.arn as never);

	return wsAPI;
};
