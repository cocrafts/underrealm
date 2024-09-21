import { constructDomainName, defaultLambdaConfigs, zoneId } from './shared';

export const constructAPI = () => {
	const domainName = constructDomainName('api', $app.stage);

	const API = new sst.aws.ApiGatewayV2('api', {
		domain: {
			name: domainName,
			dns: sst.aws.dns({ zone: zoneId }),
		},
	});

	const graphql = new sst.aws.Function('graphql', {
		handler: 'api/functions/graphql',
		...defaultLambdaConfigs($app.stage),
	});

	API.route('GET /graphql', graphql.arn);
	API.route('POST /graphql', graphql.arn);

	return API;
};
