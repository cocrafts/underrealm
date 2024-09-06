export type Rarity = 'Rare' | 'Epic' | 'Mythical' | 'Legendary' | 'Immortal';

type RarityRate = Record<Rarity, number>;

export interface PackStats {
	title: string;
	route: string;
	total: number;
	remaining: number;
	unitPrice: number;
	sugarId: string;
	rarity: RarityRate;
}

const isDevnet = SOLANA_CLUSTER === 'devnet';

export const packList: PackStats[] = [
	{
		title: 'Bronze',
		route: 'bronze',
		total: 951,
		remaining: 951,
		unitPrice: 15,
		sugarId: isDevnet
			? 'GcyRX3s882L79irZAG7QuSCf7bQEptj16gLjC62mkyrx'
			: 'GDP3MV8h8ofSGsdQZLe4N4uyZ8FsBV9j3BgLYK1t5JS5',
		rarity: {
			Rare: 55.2,
			Epic: 25.87,
			Mythical: 12.93,
			Legendary: 6.0,
			Immortal: 0,
		},
	},
	{
		title: 'Silver',
		route: 'silver',
		total: 694,
		remaining: 694,
		unitPrice: 30,
		sugarId: isDevnet
			? 'GcyRX3s882L79irZAG7QuSCf7bQEptj16gLjC62mkyrx'
			: '9wFjawBHaiYwEiqryMkeEWABprFs1ZsX6ssy1ebxXCzY',
		rarity: {
			Rare: 32.42,
			Epic: 43.66,
			Mythical: 12.97,
			Legendary: 10.81,
			Immortal: 0.14,
		},
	},
	{
		title: 'Gold',
		route: 'gold',
		total: 488,
		remaining: 488,
		unitPrice: 45,
		sugarId: isDevnet
			? 'GcyRX3s882L79irZAG7QuSCf7bQEptj16gLjC62mkyrx'
			: 'CRJCZYfZ7yDkCqrQdNxv1DDoZFJLjQRdpE6CuRN5nSbc',
		rarity: {
			Rare: 15.37,
			Epic: 17.21,
			Mythical: 47.95,
			Legendary: 18.44,
			Immortal: 1.03,
		},
	},
	{
		title: 'Platinum',
		route: 'platinum',
		total: 210,
		remaining: 210,
		unitPrice: 120,
		sugarId: isDevnet
			? 'GcyRX3s882L79irZAG7QuSCf7bQEptj16gLjC62mkyrx'
			: 'EN9FRH9Hu36mZybz6gNbhkXPc8RwWWRyuVDUTxZTjPkb',
		rarity: {
			Rare: 7.14,
			Epic: 18.57,
			Mythical: 21.43,
			Legendary: 48.57,
			Immortal: 4.29,
		},
	},
	{
		title: 'Titan',
		route: 'titan',
		total: 30,
		remaining: 30,
		unitPrice: 300,
		sugarId: isDevnet
			? 'GcyRX3s882L79irZAG7QuSCf7bQEptj16gLjC62mkyrx'
			: 'GMS4hJjLxqxg2WPZM8i4tYyHwBpH6CH2hNJdD8YkUiPe',
		rarity: {
			Rare: 0,
			Epic: 0,
			Mythical: 39.99,
			Legendary: 39.99,
			Immortal: 20.02,
		},
	},
];

type PackMap = Record<string, PackStats>;

export const packMap: PackMap = packList.reduce((a, i) => {
	a[i.route] = i;
	return a;
}, {} as PackMap);

export const getRarityTitle = (rarityLevel: string): string => {
	const rarityTier = {
		Immortal: 12,
		Legendary: 9,
		Mythical: 6,
		Epic: 3,
		Rare: 0,
	};
	const levelNumber = parseInt(rarityLevel);
	let rarityTitle = '';
	for (const i in rarityTier) {
		if (levelNumber > rarityTier[i as never]) {
			const subLevel = levelNumber - rarityTier[i as never];
			rarityTitle = `${i} #${subLevel}`;
			break;
		}
	}
	return rarityTitle;
};
