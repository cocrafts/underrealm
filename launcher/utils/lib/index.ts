import { Amplify } from 'aws-amplify';
import { configureAutoTrack } from 'aws-amplify/analytics';

import { redirectOrigin } from './auth';
import config from './awsConfig';

const {
	region,
	identityPoolId,
	userPoolId,
	userPoolClientId,
	cognitoAuthDomain,
	cognitoAuthScopes,
	pinpointAppId,
} = config;

export const configure = (): void => {
	Amplify.configure({
		Auth: {
			Cognito: {
				userPoolId,
				userPoolClientId,
				identityPoolId,
				loginWith: {
					oauth: {
						domain: cognitoAuthDomain,
						scopes: cognitoAuthScopes,
						redirectSignIn: [`${redirectOrigin}/dashboard`],
						redirectSignOut: [`${redirectOrigin}/authentication`],
						responseType: 'code',
					},
				},
			},
		},
		Analytics: {
			Pinpoint: {
				region,
				appId: pinpointAppId,
			},
		},
	});

	configureAutoTrack({
		enable: true,
		type: 'session',
	});
};

export * from './auth';
