import dotenv from 'dotenv';

import {
	constructDomainName,
	DBEnvs,
	defaultEnvs,
	defaultLambdaConfigs,
	zoneId,
} from './shared';
import { wsAPI } from './websocket';

dotenv.config({ path: `api/.env.${$app.stage}` });

const domainName = constructDomainName('api', $app.stage);

const API = new sst.aws.ApiGatewayV2('api', {
	domain: {
		name: domainName,
		dns: sst.aws.dns({ zone: zoneId }),
	},
});

const graphql = new sst.aws.Function('graphql', {
	...defaultLambdaConfigs($app.stage),
	handler: 'api/functions/graphql.handler',
	copyFiles: [{ from: 'api/schema.graphql', to: 'schema.graphql' }],
	environment: { ...defaultEnvs(), ...DBEnvs() },
	permissions: [
		{
			actions: ['execute-api:Invoke', 'execute-api:ManageConnections'],
			resources: [wsAPI.nodes.api.executionArn.apply((t) => `${t}/**/*`)],
		},
	],
});

API.route('GET /graphql', graphql.arn);
API.route('POST /graphql', graphql.arn);

export { API };
