import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import type { ICredentials } from '@aws-amplify/core';

import type { AuthError, ChallengedUser } from './internal';
import { simpleId } from './internal';

export const extractJwt = async (): Promise<string | null> => {
	try {
		const session = await Auth.currentSession();

		if (session?.isValid()) {
			const token = session.getIdToken();
			return token.getJwtToken();
		}
	} catch (error) {
		console.log(error);
	}

	return null;
};

export const googleSignIn = (): Promise<ICredentials> => {
	return Auth.federatedSignIn({
		provider: CognitoHostedUIIdentityProvider.Google,
	});
};

export const signOut = (): Promise<unknown> => {
	return Auth.signOut();
};

export const amplifySignIn = async (
	address: string,
): Promise<ChallengedUser> => {
	try {
		return await Auth.signIn(address);
	} catch (err) {
		if ((err as AuthError).message?.includes?.('not exist')) {
			const params = { username: address, password: `@${simpleId(29)}` };
			await Auth.signUp(params);

			return amplifySignIn(address);
		} else {
			throw err;
		}
	}
};

export * from './internal';
