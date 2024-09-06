import type { FC } from 'react';
import { dimensionState, themeState } from '@metacraft/ui';
import { NavigationContainer } from '@react-navigation/native';
import { useSnapshot } from 'utils/hook';

import { linking, navigationRef } from '../shared';

import DesktopStack from './Desktop';
import MobileStack from './Mobile';

export const StackContainer: FC = () => {
	const { isMobile } = useSnapshot(dimensionState);
	const theme = useSnapshot(themeState);

	return (
		<NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
			{isMobile ? <MobileStack /> : <DesktopStack />}
		</NavigationContainer>
	);
};

export default StackContainer;
