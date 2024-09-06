import type { FC } from 'react';
import { themeState } from '@metacraft/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import StoryScreen from 'screens/Story';
import CardLibraryStack from 'stacks/Browser/CardLibrary';
import { useSnapshot } from 'utils/hook';

import CardsStack from './Cards';
import GameStack from './Game';
import GuideScreen from './Guide';
import MarketplaceStack from './Marketplace';
import MintStack from './Mint';
import type { RootParamList } from './shared';
import { linking, navigationRef, stackScreenOptions } from './shared';

const Stack = createStackNavigator<RootParamList>();

export const BrowserStack: FC = () => {
	const theme = useSnapshot(themeState);

	return (
		<NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
			<Stack.Navigator screenOptions={stackScreenOptions}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Game" component={GameStack} />
				<Stack.Screen name="Cards" component={CardsStack} />
				<Stack.Screen name="Marketplace" component={MarketplaceStack} />
				<Stack.Screen name="Mint" component={MintStack} />
				<Stack.Screen name="Guide" component={GuideScreen} />
				<Stack.Screen name="Story" component={StoryScreen} />
				<Stack.Screen name="CardLibrary" component={CardLibraryStack} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default BrowserStack;
