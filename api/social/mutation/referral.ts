import { createReferralRecord } from 'models/referral';
import type { MutationResolvers } from 'types/graphql';

export const makeReferral: MutationResolvers['makeReferral'] = async (
	root,
	{ referralCode },
	{ user },
) => {
	const result = await createReferralRecord(user.id, referralCode);

	return result;
};
