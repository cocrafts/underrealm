import { Analytics } from '@aws-amplify/analytics';
import { Auth } from '@aws-amplify/auth';

import { platformOptions, redirectOrigin } from './auth';
import config from './awsConfig';

const {
	region,
	identityPoolId,
	userPoolId,
	userPoolWebClientId,
	cognitoAuthDomain,
	cognitoAuthScopes,
	pinpointAppId,
} = config;

export const configure = (): void => {
	Auth.configure({
		region,
		identityPoolId,
		userPoolId,
		userPoolWebClientId,
		authenticationFlowType: 'CUSTOM_AUTH',
		oauth: {
			...platformOptions,
			domain: cognitoAuthDomain,
			scope: cognitoAuthScopes,
			redirectSignIn: `${redirectOrigin}/dashboard`,
			redirectSignOut: `${redirectOrigin}/authentication`,
			responseType: 'code',
		},
	});

	Analytics.configure({
		autoSessionRecord: true,
		AWSPinpoint: {
			region,
			appId: pinpointAppId,
			mandatorySignIn: false,
		},
	});
};

export * from './auth';
