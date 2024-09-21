import { constructDomainName, zoneId } from './shared';

export const constructAPI = () => {
	const domainName = constructDomainName('api', $app.stage);

	const API = new sst.aws.ApiGatewayV2('api', {
		accessLog: {
			retention: '1 week',
		},
		domain: {
			name: domainName,
			dns: sst.aws.dns({ zone: zoneId }),
		},
	});

	const graphql = new sst.aws.Function('graphql', {
		handler: 'api/functions/graphql',
		architecture: 'arm64',
		runtime: 'nodejs20.x',
	});

	API.route('GET /graphql', graphql.arn);
	API.route('POST /graphql', graphql.arn);

	return API;
};
