import { model, Schema } from 'mongoose';

import { createSchema } from './utils';

export enum ItemType {
	LOTTERY = 'LOTTERY',
	CHEST = 'CHEST',
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

export const Item = model<IItem>('Item', itemSchema);
