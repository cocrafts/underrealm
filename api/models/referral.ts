import { model } from 'mongoose';

import { createSchema } from './utils';

export type IReferral = {
	id: string;
	referrerId: string;
	refereeId: string;
	claimedPoints: number;
	createdAt: Date;
	updatedAt: Date;
};

const referralSchema = createSchema({
	referrerId: String,
	refereeId: String,
	claimedPoints: {
		type: Number,
		min: 0,
		default: 80,
	},
});

referralSchema.index({ referrerId: 1, refereeId: 1 }, { unique: true });

export const Referral = model<IReferral>('Referral', referralSchema);
