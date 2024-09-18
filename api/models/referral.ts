import { model } from 'mongoose';
import { ClientError } from 'utils/errors';

import { User } from './user';
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

export const createReferralRecord = async (
	refereeId: string,
	referralCode: string,
) => {
	const referrer = await User.findOne({ referralCode });
	if (!referrer?.id) {
		throw new ClientError('Referral code is invalid');
	}

	const existReferral = await Referral.findOne({
		referrerId: referrer.id,
		refereeId,
	});
	if (existReferral.id) {
		throw new ClientError(
			'Can not make new referral cause referral already existed',
		);
	}

	Referral.create({
		referrerId: referrer.id,
		refereeId,
		claimedPoints: 80,
	});
	User.findOneAndUpdate(
		{ bindingId: referrer.id },
		{ points: referrer.points + 80 },
	);
	return true;
};
