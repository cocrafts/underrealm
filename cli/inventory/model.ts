import { model, Schema, Types } from 'mongoose';

import { createSchema } from './../utils/mongo';
// TODO:
// cli to add reward for user in batching
// 1. cli should have Item schema, fetch the sytemItem
// 2. when run this, read from csv file, each row will contain user email, itemType, quantity
// 3. update Inventory of user, push the systemItem to the items field

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
export const Item = model<IItem>('Item', itemSchema);
