import type { IItem } from 'models/asset';

export const REFERRAL_CODE_LENGTH = 7;

export enum ItemType {
	LOTTERY = 'LOTTERY',
	CHEST_WOODEN = 'CHEST_WOODEN',
	CHEST_REDWOOD = 'CHEST_REDWOOD',
	CHEST_BLACKWOOD = 'CHEST_BLACKWOOD',
	CHEST_STEEL = 'CHEST_STEEL',
	CHEST_SILVER = 'CHEST_SILVER',
	CHEST_GOLD = 'CHEST_GOLD',
	CHEST_MAGIC = 'CHEST_MAGIC',
	CHEST_MYSTIC = 'CHEST_MYSTIC',
	CHEST_LIGHT = 'CHEST_LIGHT',
	CHEST_LEGENDARY = 'CHEST_LEGENDARY',
}

/*
1	Wooden chest	50% chance
2	Red wood chest	10% chance
3	Black wood chest	10% chance
4	Steel chest	10% chance
5	Silver chest	5% chance
6	Gold chest	5% chance
7	Magic chest	4% chance
8	Mystic chest	3% chance
9	Light chest	2.5% chance
10 Legendary chest	0.5% chance
*/

export const LOTTERY_REWARD_CHANCE = {
	[ItemType.CHEST_WOODEN]: 0.5,
	[ItemType.CHEST_REDWOOD]: 0.1,
	[ItemType.CHEST_BLACKWOOD]: 0.1,
	[ItemType.CHEST_STEEL]: 0.1,
	[ItemType.CHEST_SILVER]: 0.05,
	[ItemType.CHEST_GOLD]: 0.05,
	[ItemType.CHEST_MAGIC]: 0.04,
	[ItemType.CHEST_MYSTIC]: 0.03,
	[ItemType.CHEST_LIGHT]: 0.025,
	[ItemType.CHEST_LEGENDARY]: 0.005,
};

export interface LotteryRewardRateRecord {
	type: ItemType;
	rate: number;
}

// derive the rate of lottery reward from the chance
export const LOTTERY_REWARD_RATE: LotteryRewardRateRecord[] = Object.entries(
	LOTTERY_REWARD_CHANCE,
).reduce((prev, [itemType, chance]) => {
	const currentCumulativeRate =
		prev.length == 0 ? 0 : prev[prev.length - 1].rate;

	prev.push({
		type: itemType,
		rate: currentCumulativeRate + chance,
	});

	return prev;
}, []);

// these are predefine system item, these items will be automatically added if they are not already present
export const DEFAULT_SYSTEM_ITEMS: Record<string, Partial<IItem>> = {
	[ItemType.LOTTERY]: {
		type: ItemType.LOTTERY,
		remainAmount: -1,
		metadata: {
			price: 250,
		},
	},
	[ItemType.CHEST_WOODEN]: { type: ItemType.CHEST_WOODEN, remainAmount: -1 },
	[ItemType.CHEST_REDWOOD]: { type: ItemType.CHEST_REDWOOD, remainAmount: -1 },
	[ItemType.CHEST_BLACKWOOD]: {
		type: ItemType.CHEST_BLACKWOOD,
		remainAmount: -1,
	},
	[ItemType.CHEST_STEEL]: { type: ItemType.CHEST_STEEL, remainAmount: -1 },
	[ItemType.CHEST_SILVER]: { type: ItemType.CHEST_SILVER, remainAmount: -1 },
	[ItemType.CHEST_GOLD]: { type: ItemType.CHEST_GOLD, remainAmount: -1 },
	[ItemType.CHEST_MAGIC]: { type: ItemType.CHEST_MAGIC, remainAmount: -1 },
	[ItemType.CHEST_MYSTIC]: { type: ItemType.CHEST_MYSTIC, remainAmount: -1 },
	[ItemType.CHEST_LIGHT]: { type: ItemType.CHEST_LIGHT, remainAmount: -1 },
	[ItemType.CHEST_LEGENDARY]: {
		type: ItemType.CHEST_LEGENDARY,
		remainAmount: -1,
	},
};
