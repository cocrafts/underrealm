import type { DrawerNavigationOptions } from '@react-navigation/drawer';
import type { DrawerNavigationHelpers } from '@react-navigation/drawer/src/types';
import type {
	LinkingOptions,
	NavigatorScreenParams,
	ParamListBase,
} from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';

export const stackScreenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export const drawerScreenOptions: DrawerNavigationOptions = {
	headerShown: false,
};

export type HomeParamList = {
	Dashboard: undefined;
};

export type GameParamList = {
	Dashboard: undefined;
	Duel: {
		id: string;
	};
};

export type MarketplaceParamList = {
	Dashboard: undefined;
	DetailCard: {
		id: string;
	};
};

export type CardsParamList = {
	Dashboard: undefined;
};

export type MintParamList = {
	Dashboard: undefined;
	DetailPack: {
		id: string;
	};
};

export type GuideParamList = {
	Dashboard: undefined;
};

export type CardLibraryParamList = {
	Library: undefined;
	DetailCard: {
		id: string;
	};
};

export type RootParamList = {
	Home: NavigatorScreenParams<HomeParamList>;
	Game: NavigatorScreenParams<GameParamList>;
	Cards: NavigatorScreenParams<CardsParamList>;
	Marketplace: NavigatorScreenParams<MarketplaceParamList>;
	Mint: NavigatorScreenParams<MintParamList>;
	Guide: NavigatorScreenParams<GuideParamList>;
	Story: NavigatorScreenParams<ParamListBase>;
	Quest: undefined;
	CardLibrary: NavigatorScreenParams<CardLibraryParamList>;
	AuthResponse: undefined;
	Profile: undefined;
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['https://underrealm.io'],
	config: {
		screens: {
			Home: {
				path: '/',
				screens: {
					Dashboard: '/',
				},
			},
			Game: {
				path: '/game',
				screens: {
					Dashboard: '/',
					Duel: '/duel/:id',
				},
			},
			Cards: {
				path: '/cards',
				screens: {
					Dashboard: '/',
				},
			},
			Marketplace: {
				path: '/marketplace',
				screens: {
					Dashboard: '/',
					DetailCard: '/detail/:id',
				},
			},
			Mint: {
				path: '/mint',
				screens: {
					Dashboard: '/',
					DetailPack: '/:id',
				},
			},
			Guide: {
				path: '/how-to-play',
				screens: {
					Dashboard: '/',
				},
			},
			Story: {
				path: '/story',
			},
			Quest: {
				path: '/quest',
			},
			CardLibrary: {
				path: '/card-library',
				screens: {
					Library: '/',
					DetailCard: '/detail/:id',
				},
			},
			AuthResponse: '/authreponse',
		},
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

export const navigate = (
	name: keyof RootParamList,
	params?: RootParamList[keyof RootParamList],
): void => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params as never);
	}
};

interface DrawerHelper {
	navigation?: DrawerNavigationHelpers;
}

export const drawerHelper: DrawerHelper = {};
