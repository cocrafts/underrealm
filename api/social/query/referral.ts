import { Referral } from 'models/referral';
import { requireAuth } from 'utils/context';
import type { ProfileResolvers, QueryResolvers } from 'utils/types';

export const referralHistory: QueryResolvers['referralHistory'] = requireAuth(
	async (root, _, { user }) => {
		return await Referral.find({ referrerId: user.id });
	},
);

export const referred: ProfileResolvers['referred'] = requireAuth(
	async (root, _, { user }) => {
		return await Referral.findOne({ refereeId: user.id });
	},
);
