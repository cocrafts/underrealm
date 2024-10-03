import { model, Schema, Types } from 'mongoose';

import { logger } from '../utils/logger';

import { createSchema } from './utils';

export interface IItem {
	id: string;
	type: ItemType;
	remainAmount: number;
	metadata: Record<string, string | number>;
}

export const itemSchema = createSchema({
	type: String,
	remainAmount: Number,
	metadata: Schema.Types.Mixed,
});

itemSchema.index({ type: 1 }, { unique: true });

export interface IInventoryItem {
	itemId: Types.ObjectId | IItem;
	type: ItemType;
	amount: number;
}

const inventoryItem = createSchema({
	itemId: { type: Types.ObjectId, ref: 'Item' },
	type: String,
	amount: Number,
});

export interface IInventory {
	id: string;
	userId: Types.ObjectId;
	items: IInventoryItem[];
}

const inventorySchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User' },
	items: [inventoryItem],
});

export const boostrapSystemAssets = async () => {
	const systemItemsTypes = Object.keys(DEFAULT_SYSTEM_ITEMS);
	const systemItemsInfo = await Item.find({
		type: { $in: systemItemsTypes },
	});

	Object.entries(DEFAULT_SYSTEM_ITEMS).forEach(async ([type, item]) => {
		if (systemItemsInfo.findIndex((val) => val.type == type) == -1) {
			logger.info(`system item ${type} not found, adding...`);
			const result = await Item.create({ ...item });
			if (!result) {
				throw result.errors;
			}
		}
	});

	logger.info('bootstrap system items completed');
};

export const consumeSystemItems = async (item: IItem, amount: number = 1) => {
	if (!isLimitedItem(item)) {
		// don't change remain amount if this is un
		return;
	}

	if (item.remainAmount > 0) {
		const updateResponse = await Item.updateOne(
			{ type: item.type, remainAmount: { $geq: amount } },
			{ $inc: { remainAmount: -amount } },
		);
		if (!updateResponse.acknowledged) {
			throw new Error("can't subtract reward amount from system");
		}
	} else if (item.remainAmount == 0) {
		throw new Error('item amount cannot be negative');
	}
};

export const isLimitedItem = (item: IItem): Boolean => {
	// TODO: since we don't limit system amount now, treat negative reaminAmount as infinite, so skip update item's remainAmount if remainAmount is already negative
	return item.remainAmount != -1;
};

export const Inventory = model<IInventory>('Inventory', inventorySchema);
export const Item = model<IItem>('Item', itemSchema);

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
export const LOTTERY_REWARD_RATES: LotteryRewardRateRecord[] = Object.entries(
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
