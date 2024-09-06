import type { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import StoryScreen from 'screens/Story';
import CardLibraryStack from 'stacks/Browser/CardLibrary';
import CardsStack from 'stacks/Browser/Cards';
import GameStack from 'stacks/Browser/Game';
import GuideScreen from 'stacks/Browser/Guide';
import MarketplaceStack from 'stacks/Browser/Marketplace';
import MintStack from 'stacks/Browser/Mint';
import type { RootParamList } from 'stacks/Browser/shared';
import { stackScreenOptions } from 'stacks/Browser/shared';

const Stack = createStackNavigator<RootParamList>();

export const BrowserStack: FC = () => {
	return (
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
	);
};

export default BrowserStack;
