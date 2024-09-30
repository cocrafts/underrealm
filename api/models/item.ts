import { model, Schema } from 'mongoose';
import type { ItemType } from 'utils/common';
import { DEFAULT_SYSTEM_ITEMS } from 'utils/common';

import { createSchema } from './utils';

export type IItem = {
	id: string;
	type: ItemType;
	remainAmount: number;
	metadata: Record<string, string | number>;
};

export const itemSchema = createSchema({
	type: String,
	remainAmount: Number,
	metadata: Schema.Types.Mixed,
});

export const Item = model<IItem>('Item', itemSchema);

export const boostrapSystemItems = async () => {
	const systemItemsTypes = Object.keys(DEFAULT_SYSTEM_ITEMS);
	const systemItemsInfo = await Item.find({
		type: { $in: systemItemsTypes },
	});
	console.log('systemitemsinfo ===>', systemItemsInfo);

	Object.entries(DEFAULT_SYSTEM_ITEMS).forEach(async ([type, item]) => {
		if (systemItemsInfo.findIndex((val) => val.type == type) == -1) {
			const result = await Item.create({ ...item });
			if (result == undefined) {
				throw result.errors;
			}
		}
	});
	console.log('completed update systemitems');
};

export const consumeSystemItems = async (item: IItem, amount: number = -1) => {
	if (item.remainAmount > 0) {
		const updateResponse = await Item.updateOne(
			{ type: item.type },
			{ $inc: { remainAmount: amount } },
		);
		if (!updateResponse.acknowledged) {
			throw new Error("can't subtract reward amount from system");
		}
	} else if (item.remainAmount == 0) {
		throw new Error('item amount cannot be negative');
	}
	// TODO: since we don't limit system amount now, treat negative reaminAmount as infinite, so skip update item's remainAmount if remainAmount is already negative
};
