import { useCallback, useEffect } from 'react';
import type { HubCallback } from '@aws-amplify/core';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Hub } from 'aws-amplify/utils';
import type { RootParamList } from 'stacks/Browser/shared';
import { graphQlClient } from 'utils/graphql';
import { profile as profileQuery } from 'utils/graphql/query';

interface InitConfig {
	onSignIn?: () => void;
	onSignOut?: () => void;
}

export const useAppInit = (config?: InitConfig): void => {
	const onAuth = useCallback<HubCallback>(({ payload: { event, data } }) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (event === 'signIn' && (data as any).username) {
			config?.onSignIn?.();
		} else if (event === 'signOut') {
			config?.onSignOut?.();
		}
	}, []);

	useEffect(() => {
		graphQlClient.refetchQueries({ include: [profileQuery] });
		const stopListen = Hub.listen('auth', onAuth);

		return () => stopListen();
	}, []);
};

export const useRootNavigation = (): StackNavigationProp<RootParamList> => {
	return useNavigation<StackNavigationProp<RootParamList>>();
};
