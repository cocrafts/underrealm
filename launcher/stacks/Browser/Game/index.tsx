import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameDashboard from 'screens/Game/Dashboard';
import GameDuel from 'screens/Game/Duel';

import type { GameParamList } from '../shared';
import { stackScreenOptions } from '../shared';

const Stack = createStackNavigator<GameParamList>();

export const GameStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name="Dashboard" component={GameDashboard} />
			<Stack.Screen name="Duel" component={GameDuel} />
		</Stack.Navigator>
	);
};

export default GameStack;
