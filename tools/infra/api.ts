import dotenv from 'dotenv';

import {
	APIEnvs,
	constructDomainName,
	defaultLambdaConfigs,
	zoneId,
} from './shared';

export const constructAPI = () => {
	dotenv.config({ path: `api/.env.${$app.stage}` });

	const domainName = constructDomainName('api', $app.stage);

	const API = new sst.aws.ApiGatewayV2('api', {
		domain: {
			name: domainName,
			dns: sst.aws.dns({ zone: zoneId }),
		},
	});

	const graphql = new sst.aws.Function('graphql', {
		handler: 'api/functions/graphql.handler',
		copyFiles: [{ from: 'api/schema.graphql', to: 'schema.graphql' }],
		environment: { ...APIEnvs() },
		...defaultLambdaConfigs($app.stage),
	});

	API.route('GET /graphql', graphql.arn);
	API.route('POST /graphql', graphql.arn);

	return API;
};
