import { getReferralByReferrerId } from 'models/referral';
import type { ProfileResolvers, ReferralHistoryDetail } from 'types/graphql';

export const referralHistory: ProfileResolvers['referralHistory'] = async ({
	id,
}) => {
	let count = 0;
	let points = 0;
	const referrals = await getReferralByReferrerId(id);
	const detail: ReferralHistoryDetail[] = referrals.map((ref) => {
		count += 1;
		points += ref.claimedPoints;
		return {
			id: ref.id,
			referredId: ref.referredId,
			claimedPoints: ref.claimedPoints,
			timestamp: ref.timestamp.toDateString(),
		};
	});
	return { count, points, detail };
};
