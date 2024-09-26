import { Referral } from 'models/referral';
import type { ProfileResolvers, QueryResolvers } from 'utils/types';

export const referralHistory: QueryResolvers['referralHistory'] = async (
	root,
	_,
	{ user },
) => {
	return await Referral.find({ referrerId: user.id });
};

export const referred: ProfileResolvers['referred'] = async (
	root,
	_,
	{ user },
) => {
	return await Referral.findOne({ refereeId: user.id });
};
