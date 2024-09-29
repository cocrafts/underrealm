import { model, Schema } from 'mongoose';
import { type ItemType } from 'utils/common';

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
