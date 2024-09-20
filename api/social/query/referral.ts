import { Referral } from 'models/referral';
import type { QueryResolvers, ReferralHistoryDetail } from 'types/graphql';

export const referralHistory: QueryResolvers['referralHistory'] = async (
	root,
	_,
	{ user },
) => {
	let count = 0;
	let points = 0;
	const referrals = await Referral.find({ referrerId: user.id });
	const detail: ReferralHistoryDetail[] = referrals.map((ref) => {
		count += 1;
		points += ref.claimedPoints;
		return {
			id: ref.id,
			refereeId: ref.refereeId,
			claimedPoints: ref.claimedPoints,
			createdAt: new Date(ref.createdAt).toDateString(),
		};
	});
	return {
		count,
		points,
		detail,
	};
};
