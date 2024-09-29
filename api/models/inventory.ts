import { model, Types } from 'mongoose';

import { createSchema } from './utils';

export type IInventoryItem = {
	itemId: Types.ObjectId;
	amount: number;
};

const inventoryItem = createSchema({
	itemId: { type: Types.ObjectId, ref: 'Item' },
	amount: Number,
});

export type IInventory = {
	id: string;
	userId: Types.ObjectId;
	items: IInventoryItem[];
};

const inventorySchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User' },
	items: [inventoryItem],
});

export const Inventory = model<IInventory>('Inventory', inventorySchema);
