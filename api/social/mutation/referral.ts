import { Referral } from 'models/referral';
import { User } from 'models/user';
import mongoose from 'mongoose';
import { ClientError } from 'utils/errors';
import type { MutationResolvers } from 'utils/types';

export const makeReferral: MutationResolvers['makeReferral'] = async (
	root,
	{ referralCode },
	{ user },
) => {
	const referrer = await User.findOne({ referralCode });
	if (!referrer?.id) {
		throw new ClientError('Referral code is invalid');
	}

	const existReferral = await Referral.findOne({
		referrerId: referrer.id,
		refereeId: user.id,
	});
	if (existReferral.id) {
		throw new ClientError(
			'Can not make new referral cause referral already existed',
		);
	}

	const session = await mongoose.startSession();
	session.startTransaction();

	const referralPoints = 80;
	await Referral.create(
		[
			{
				referrerId: referrer.id,
				refereeId: user.id,
				claimedPoints: referralPoints,
			},
		],
		{ session },
	);
	await User.findOneAndUpdate(
		{ bindingId: referrer.id },
		{ $inc: { points: referralPoints } },
		{ session },
	);
	await session.commitTransaction();
	session.endSession();

	return true;
};
