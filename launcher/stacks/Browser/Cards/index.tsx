import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CardDashboard from 'screens/Cards/Dashboard';

import type { GameParamList } from '../shared';
import { stackScreenOptions } from '../shared';

const Stack = createStackNavigator<GameParamList>();

export const CardsStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name="Dashboard" component={CardDashboard} />
		</Stack.Navigator>
	);
};

export default CardsStack;
