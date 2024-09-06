import { Linking, Platform } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import type { CognitoUser } from 'amazon-cognito-identity-js';

export type AuthError = {
	message: string;
};

export type ChallengedUser = CognitoUser & {
	challengeParam: Record<string, string>;
};

export const urlOpener = async (
	url: string,
	redirectUrl: string,
): Promise<void> => {
	await InAppBrowser.isAvailable();
	const response = await InAppBrowser.openAuth(url, redirectUrl, {
		showTitle: false,
		enableUrlBarHiding: true,
		enableDefaultShare: false,
		ephemeralWebSession: false,
	});

	if (response.type === 'success') {
		await Linking.openURL(response.url);
	}
};

export const platformOptions = Platform.select({
	web: {},
	default: { urlOpener },
});

export const redirectOrigin = Platform.select({
	default: 'metacraft:/',
	web: AUTH_REDIRECT_ORIGIN,
});

export const simpleId = (length: number): string => {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};
