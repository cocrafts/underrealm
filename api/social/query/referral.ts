import { Referral } from 'models/referral';
import type { QueryResolvers } from 'utils/types';

export const referralHistory: QueryResolvers['referralHistory'] = async (
	root,
	_,
	{ user },
) => {
	const referrals = await Referral.find({ referrerId: user.bindingId });

	return referrals.map((ref) => ({
		id: ref.id,
		referrerId: ref.referrerId,
		refereeId: ref.refereeId,
		claimedPoints: ref.claimedPoints,
		createdAt: new Date(ref.createdAt),
	}));
};
