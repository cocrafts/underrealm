import dotenv from 'dotenv';

import {
	constructDomainName,
	DBEnvs,
	defaultEnvs,
	defaultLambdaConfigs,
	zoneId,
} from './shared';

dotenv.config({ path: `api/.env.${$app.stage}` });

const domainName = constructDomainName('websocket', $app.stage);

const wsAPI = new sst.aws.ApiGatewayWebSocket('websocket', {
	domain: {
		name: domainName,
		dns: sst.aws.dns({ zone: zoneId }),
	},
});

const socket = new sst.aws.Function('socket', {
	...defaultLambdaConfigs($app.stage),
	handler: 'api/functions/socket.handler',
	copyFiles: [{ from: 'api/schema.graphql', to: 'schema.graphql' }],
	environment: { ...defaultEnvs(), ...DBEnvs() },
	permissions: [
		{
			actions: ['execute-api:Invoke', 'execute-api:ManageConnections'],
			resources: [wsAPI.nodes.api.executionArn.apply((t) => `${t}/**/*`)],
		},
	],
});

wsAPI.route('$connect', socket.arn as never);
wsAPI.route('$disconnect', socket.arn as never);
wsAPI.route('$default', socket.arn as never);
wsAPI.route('game', socket.arn as never);

export { wsAPI };
