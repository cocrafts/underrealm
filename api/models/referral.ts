import { model, Schema } from 'mongoose';

import { getUserByReferralCode } from './user';

const referralSchema = new Schema({
	referrerId: String,
	referredId: String,
	claimedPoints: {
		type: Number,
		min: 0,
		default: 80,
	},
});

referralSchema.index({ referrer: 1, referee: 1 }, { unique: true });

export const Referral = model('Referral', referralSchema);

export const createReferralRecord = async (
	referredId: string,
	referralCode: string,
) => {
	try {
		const referrer = await getUserByReferralCode(referralCode);
		if (!referrer?.id) {
			throw new Error('Referral code is invalid');
		}
		const referralRecord = new Referral({
			referrerId: referrer.id,
			referredId,
			claimedPoints: 80,
		});
		await referralRecord.save();
		return true;
	} catch (err) {
		throw new Error(err);
	}
};
