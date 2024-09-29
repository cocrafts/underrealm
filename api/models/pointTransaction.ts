import { model, Types } from 'mongoose';

import { createSchema } from './utils';

export enum TransactionType {
	PURCHASELOTTERY = 'PURCHASELOTTERY',
}

export type IPointTransaction = {
	id: string;
	type: TransactionType;
	amount: number;
	createdAt: Date;
};

const pointTransactionSchema = createSchema({
	type: {
		type: String,
		enum: ['PURCHASE_ITEM', 'OPEN_CHEST'],
	},
	amount: Number,
});

export type IPointTransactionLog = {
	_id: string;
	userId: string;
	transactions: [IPointTransaction];
};
const pointTransactionLogSchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User' },
	transactions: [pointTransactionSchema],
});

pointTransactionLogSchema.index({ id: 1, userId: 1 }, { unique: true });

export const PointTransactionLog = model<IPointTransactionLog>(
	'PointTransactionLog',
	pointTransactionLogSchema,
);

// TODO: define the mongoose model: inventory, item (lottery, chest), point transaction log
