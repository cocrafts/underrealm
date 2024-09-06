import type { RootParamList } from 'stacks/Browser/shared';

export interface NavigationConfig {
	title: string;
	url?: string;
	route?: keyof RootParamList;
	params?: RootParamList[keyof RootParamList];
	active?: boolean;
}

export const stormGateNav = {
	title: 'StormGate',
	url: 'https://stormgate.io',
};

export const stormNavigations: NavigationConfig[] = [
	{
		title: 'Under Realm',
		url: 'https://underrealm.io',
		active: true,
	},
	// {
	// 	title: 'Bench',
	// 	url: 'https://bench.stormgate.io',
	// },
	{
		title: 'Tokenomic (coming soon)',
		// url: 'https://docs.stormgate.io/whitepaper/tokenomic',
	},
	{
		title: 'Lore',
		url: 'https://stormgate.substack.com/p/welcome-to-atem-world-adventurers',
	},
	// {
	// 	title: 'News',
	// 	url: 'https://stormgate.substack.com/',
	// },
	// {
	// 	title: 'Docs',
	// 	url: 'https://docs.stormgate.io/',
	// },
];

export const homeNav: NavigationConfig = {
	title: 'Home',
	route: 'Home',
};

const howToPlayNav: NavigationConfig = {
	title: 'How to play',
	route: 'Guide',
};

const storyNav: NavigationConfig = {
	title: 'Story',
	route: 'Story',
};

// Temporarily disable Mint route
// export const mintNav: NavigationConfig = {
// 	title: 'NFT Mint (coming in Jun)',
// 	route: 'Mint',
// 	params: { screen: 'Dashboard' },
// };

export const localNavigations: NavigationConfig[] = [
	homeNav,
	howToPlayNav,
	storyNav,
	// mintNav,
];

export const navigationHeight = {
	storm: 40,
	local: 68,
};
