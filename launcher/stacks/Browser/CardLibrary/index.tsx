import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailCardScreen from 'screens/CardLibrary/DetailCard';
import LibraryScreen from 'screens/CardLibrary/Library';
import { stackScreenOptions } from 'stacks/Browser/shared';

const Stack = createStackNavigator();

const CardLibraryStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name="Library" component={LibraryScreen} />
			<Stack.Screen name="DetailCard" component={DetailCardScreen} />
		</Stack.Navigator>
	);
};

export default CardLibraryStack;
