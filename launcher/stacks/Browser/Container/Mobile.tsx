import type { FC } from 'react';
import type { DrawerContentComponentProps } from 'components/DrawerNavigation';
import { createDrawerNavigator } from 'components/DrawerNavigation';
import HomeScreen from 'screens/Home';
import ProfileScreen from 'screens/Profile';
import QuestScreen from 'screens/Quest';
import StoryScreen from 'screens/Story';
import CardLibraryStack from 'stacks/Browser/CardLibrary';
import CardsStack from 'stacks/Browser/Cards';
import GameStack from 'stacks/Browser/Game';
import GuideScreen from 'stacks/Browser/Guide';
import MarketplaceStack from 'stacks/Browser/Marketplace';
import MintStack from 'stacks/Browser/Mint';
import { drawerScreenOptions } from 'stacks/Browser/shared';

import DrawerMenu from './DrawerMenu';

const Drawer = createDrawerNavigator();

export const Mobile: FC = () => {
	const renderDrawer = (props: DrawerContentComponentProps) => (
		<DrawerMenu {...props} />
	);

	return (
		<Drawer.Navigator
			screenOptions={drawerScreenOptions}
			drawerContent={renderDrawer}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Game" component={GameStack} />
			<Drawer.Screen name="Cards" component={CardsStack} />
			<Drawer.Screen name="Marketplace" component={MarketplaceStack} />
			<Drawer.Screen name="Mint" component={MintStack} />
			<Drawer.Screen name="Quest" component={QuestScreen} />
			<Drawer.Screen name="Guide" component={GuideScreen} />
			<Drawer.Screen name="Story" component={StoryScreen} />
			<Drawer.Screen name="Profile" component={ProfileScreen} />
			<Drawer.Screen name="CardLibrary" component={CardLibraryStack} />
		</Drawer.Navigator>
	);
};

export default Mobile;
