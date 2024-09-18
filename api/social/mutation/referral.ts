import { Referral } from 'models/referral';
import { User } from 'models/user';
import type { MutationResolvers } from 'types/graphql';
import { ClientError } from 'utils/errors';

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

	const referralPoints = 80;
	Referral.create({
		referrerId: referrer.id,
		refereeId: user.id,
		claimedPoints: referralPoints,
	});
	User.findOneAndUpdate(
		{ bindingId: referrer.id },
		{ points: referrer.points + referralPoints },
	);

	return true;
};
