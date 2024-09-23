import {
	confirmSignIn,
	fetchAuthSession,
	signIn,
	signInWithRedirect,
	signOut,
	signUp,
} from 'aws-amplify/auth';
import bs58 from 'bs58';

import type { AuthError, ChallengedUser } from './internal';
import { simpleId } from './internal';

export { signOut } from 'aws-amplify/auth';

export const extractJwt = async (): Promise<string | null> => {
	try {
		const { tokens } = await fetchAuthSession();
		return tokens?.idToken.toString();
	} catch (error) {
		console.log(error);
	}

	return null;
};

export const googleSignIn = async (): Promise<void> => {
	await signOut();
	return signInWithRedirect({
		provider: 'Google',
	});
};

const loginMessage = (nonce: string) =>
	`Sign this message prove that you have access to this wallet and we'll log you in. This won't cost you anything! [Seal: ${nonce}]`;

export const walletSignIn = async (
	address: string,
	signMessage?: (message: Uint8Array) => Promise<Uint8Array>,
): Promise<ChallengedUser> => {
	await signOut();
	try {
		const { nextStep } = await signIn({
			username: address,
			options: { authFlowType: 'CUSTOM_WITHOUT_SRP' },
		});
		if (nextStep.signInStep !== 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE')
			throw Error('unsupported sign-in method');

		const message = loginMessage(nextStep.additionalInfo.nonce);
		const encodedMessage = new TextEncoder().encode(message);
		const signature = await signMessage?.(encodedMessage);
		const encodedSignature = bs58.encode(signature || []);

		await confirmSignIn({
			challengeResponse: encodedSignature,
		});
	} catch (err) {
		if ((err as AuthError).message?.includes?.('not exist')) {
			const params = { username: address, password: `@${simpleId(29)}` };
			await signUp(params);
			return walletSignIn(address);
		} else {
			throw err;
		}
	}
};

export * from './internal';
