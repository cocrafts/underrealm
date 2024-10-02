import { model, Schema, Types } from 'mongoose';
import type { ItemType } from 'utils/common';
import { DEFAULT_SYSTEM_ITEMS } from 'utils/common';
import { logger } from 'utils/logger';

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
