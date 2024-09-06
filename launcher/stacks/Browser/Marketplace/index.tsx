import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarketplaceScreen from 'screens/Marketplace';
import DetailCardScreen from 'screens/Marketplace/DetailCard';

import type { MarketplaceParamList } from '../shared';
import { stackScreenOptions } from '../shared';

const Stack = createStackNavigator<MarketplaceParamList>();

export const MarketplaceStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name="Dashboard" component={MarketplaceScreen} />
			<Stack.Screen name="DetailCard" component={DetailCardScreen} />
		</Stack.Navigator>
	);
};

export default MarketplaceStack;
