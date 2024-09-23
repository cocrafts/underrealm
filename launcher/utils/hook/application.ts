import { useCallback, useEffect } from 'react';
import type { HubCallback } from '@aws-amplify/core';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Hub } from 'aws-amplify/utils';
import type { RootParamList } from 'stacks/Browser/shared';
import { accountActions } from 'utils/state/account';

interface InitConfig {
	withProfileFetch: boolean;
	onSignIn?: () => void;
	onSignOut?: () => void;
}

export const useAppInit = ({
	withProfileFetch,
	onSignIn,
	onSignOut,
}: InitConfig): void => {
	const onAuth = useCallback<HubCallback>(({ payload: { event, data } }) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (event === 'signIn' && (data as any).username) {
			accountActions.syncProfile();
			onSignIn?.();
		} else if (event === 'signOut') {
			onSignOut?.();
		}
	}, []);

	useEffect(() => {
		if (withProfileFetch) accountActions.syncProfile();
		const stopListen = Hub.listen('auth', onAuth);

		return () => stopListen();
	}, []);
};

export const useRootNavigation = (): StackNavigationProp<RootParamList> => {
	return useNavigation<StackNavigationProp<RootParamList>>();
};
