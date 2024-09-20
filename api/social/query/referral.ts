import { Referral } from 'models/referral';
import type { QueryResolvers } from 'types/graphql';

export const referralHistory: QueryResolvers['referralHistory'] = async (
	root,
	_,
	{ user },
) => {
	const referrals = await Referral.find({ referrerId: user.id });

	return referrals.map((ref) => ({
		id: ref.id,
		referrerId: ref.referrerId,
		refereeId: ref.refereeId,
		claimedPoints: ref.claimedPoints,
		createdAt: new Date(ref.createdAt),
	}));
};
