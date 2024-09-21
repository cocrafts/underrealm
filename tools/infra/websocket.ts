import { constructDomainName, defaultLambdaConfigs, zoneId } from './shared';

export const constructWebsocketAPI = () => {
	const domainName = constructDomainName('websocket', $app.stage);

	const wsAPI = new sst.aws.ApiGatewayWebSocket('websocket', {
		domain: {
			name: domainName,
			dns: sst.aws.dns({ zone: zoneId }),
		},
	});

	const socket = new sst.aws.Function('socket', {
		handler: 'api/functions/socket',
		...defaultLambdaConfigs($app.stage),
	});

	wsAPI.route('$connect', socket.arn as never);
	wsAPI.route('$disconnect', socket.arn as never);
	wsAPI.route('graphql', socket.arn as never);

	return wsAPI;
};
