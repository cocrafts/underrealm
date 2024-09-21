import type { ContextFunction } from '@apollo/server';
import jwt from 'jsonwebtoken';
import { getItem } from 'utils/aws/dynamo';
import { getParameter } from 'utils/aws/parameter';

import { configs } from './config';
import { ClientError } from './errors';
import type { ClientProfile, UserProfile } from './internal';
import { cognitoToProfile, verifyAsync } from './internal';

export type ApiContext = {
	user: UserProfile;
	client: ClientProfile;
};

export const graphqlContext: ContextFunction<unknown[], ApiContext> = async ({
	event,
	req,
}) => {
	let user = { id: null } as UserProfile;
	let client = { id: null } as ClientProfile;

	const headers = event?.headers || req?.headers || {};
	const authorization = headers['Authorization'] || headers['authorization'];
	const clientKey = headers['Client-Key'] || headers['client-key'];

	if (clientKey) {
		const { Parameter } = await getParameter('metacraft-admin-jwt');
		const verifierPublicKey = Parameter.Value;

		try {
			client = jwt.verify(clientKey, verifierPublicKey) as ClientProfile;
		} catch (err) {
			throw new ClientError(`Can not verify Client-Key: ${err}`);
		}
	}

	if (configs.IS_LAMBDA && !client?.id) throw new ClientError('invalid client');

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
			const { Item: profile } = await getItem(`profile#${user.id}`);
			Object.assign(user, profile);
		} catch (err) {
			throw new ClientError(`Can not verify token: ${err}`);
		}
	}

	return { user, client };
};

export * from './internal';
