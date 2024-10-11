import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import jwkJSON from '../../jwk.json';
import { ClientError } from '../errors';

export type CognitoUser = {
	username: string;
	email?: string;
	wallet?: string;
	provider: string;
};

const pemMap = Object.keys(jwkJSON).reduce((obj, key) => {
	return { ...obj, [key]: jwkToPem(jwkJSON[key]) };
}, {});

export const verifyToken = async (token: string): Promise<CognitoUser> => {
	const parts = token.split('.');
	const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
	const publicKey = pemMap[header.kid];

	const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });

	if (typeof decoded === 'string') {
		throw new ClientError('invalid token payload');
	}

	return extractCognitoProfile(decoded);
};

const extractCognitoProfile = (payload: JwtPayload): CognitoUser => {
	const username = payload['cognito:username'];
	const email = payload.email;
	const provider = providerFromUsername(username);
	const wallet = provider === 'Wallet' ? username : undefined;

	return { username, provider, email, wallet };
};

const providerFromUsername = (username: string) => {
	if (username.startsWith('Google_')) {
		return 'Google';
	}

	return 'Wallet';
};
