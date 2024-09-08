import { ForbiddenError } from 'apollo-server-lambda';
import { getParameter } from 'aws/parameter';
import { verify } from 'jsonwebtoken';

import { configs } from './config';
import type { ClientProfile, UserProfile } from './internal';
import { cognitoToProfile, verifyAsync } from './internal';

export interface ApiContext {
	user: UserProfile;
	client: ClientProfile;
}

export type Resolver<A, R = void> = (
	root: unknown,
	args: A,
	context: ApiContext,
) => Promise<R>;

export const graphqlContext = async ({ event, req }): Promise<ApiContext> => {
	let user = { id: null } as UserProfile;
	let client = { id: null } as ClientProfile;

	const headers = event?.headers || req?.headers || {};
	const authorization = headers['Authorization'] || headers['authorization'];
	const clientKey = headers['Client-Key'] || headers['client-key'];

	if (clientKey) {
		const { Parameter } = await getParameter('metacraft-admin-jwt');
		client = verify(clientKey, Parameter.Value) as UserProfile;
	}

	if (configs.IS_LAMBDA && !client?.id)
		throw new ForbiddenError('invalid client');

	if (authorization) {
		try {
			const token = authorization?.substring(7);
			const tokenSections = (token || '').split('.');
			const headerJson = Buffer.from(tokenSections[0], 'base64').toString(
				'utf8',
			);
			const header = JSON.parse(headerJson);

			const cognitoUser = (await verifyAsync(token, header.kid)) as never;
			user = cognitoToProfile(cognitoUser);
		} catch (err) {
			console.log('something went wrong during jwt decode:', err);
		}
	}

	return { user, client };
};

export * from './internal';
