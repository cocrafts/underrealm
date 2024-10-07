import { model, Types } from 'mongoose';

import { createSchema } from './utils';

export enum GeneralPointTransactionType {
	PURCHASE_LOTTERY = 'PURCHASE_LOTTERY',
	OPEN_CHEST = 'OPEN_CHEST',
}

export type IGeneralPointTransaction = {
	id: string;
	userId: string;
	type: GeneralPointTransactionType;
	points: number;
	createdAt: Date;
};

const GeneralPointTransactionSchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User', required: true },
	type: {
		type: String,
		enum: Object.values(GeneralPointTransactionType),
	},
	points: Number,
});

export const GeneralPointTransaction = model<IGeneralPointTransaction>(
	'GeneralPointTransaction',
	GeneralPointTransactionSchema,
);
