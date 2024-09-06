export interface NaviItem {
	id: string;
	title: string;
	screen: string;
}

export const naviItemList: NaviItem[] = [
	{
		id: 'home',
		title: 'Home',
		screen: 'Home',
	},
	{
		id: 'guide',
		title: 'How to play',
		screen: 'Guide',
	},
	{
		id: 'story',
		title: 'Story',
		screen: 'Story',
	},
	// {
	// 	id: 'mint',
	// 	title: 'Mint',
	// 	screen: 'Mint',
	// },
];
