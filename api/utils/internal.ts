import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';

import jwkJSON from '../jwk.json';

export interface UserProfile {
	id?: string;
	linkedId?: string;
	provider?: string;
}

export interface ClientProfile {
	id?: string;
}

const pemMap = Object.keys(jwkJSON).reduce((obj, key) => {
	return { ...obj, [key]: jwkToPem(jwkJSON[key]) };
}, {});

export const verifyAsync = (
	token: string,
	kid: string,
): Promise<string | JwtPayload> =>
	new Promise((resolve, reject) => {
		return jwt.verify(
			token,
			pemMap[kid],
			{ algorithms: ['RS256'] },
			(err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			},
		);
	});

const providerFromUsername = (username: string) => {
	if (username.startsWith('Google_')) {
		return 'Google';
	}

	return 'Wallet';
};

export const cognitoToProfile = (cognitoUser: JwtPayload): UserProfile => {
	const username = cognitoUser['cognito:username'];
	const { profile } = cognitoUser;

	return {
		id: username,
		linkedId: profile || username,
		provider: providerFromUsername(username),
	};
};
