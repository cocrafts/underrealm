import { model } from 'mongoose';

import { createSchema } from './utils';

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

export const Referral = model('Referral', referralSchema);
