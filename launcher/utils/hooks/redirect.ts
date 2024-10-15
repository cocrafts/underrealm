import { useEffect } from 'react';
import { getStateFromPath } from '@react-navigation/native';
import { linking, navigationRef } from 'stacks/Browser/shared';
import { getPendingRedirect } from 'utils/lib/auth/redirect';

export const usePendingRedirect = () => {
	useEffect(() => {
		const redirect = getPendingRedirect();
		if (redirect && redirect !== '/') {
			console.log('Redirect to', redirect);
			const state = getStateFromPath(redirect, linking.config);
			if (state) navigationRef.reset({ index: 0, routes: state.routes });
		}
	}, []);
};
