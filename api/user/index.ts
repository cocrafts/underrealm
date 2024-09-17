import { getItem } from 'aws/dynamo';
import { getReferralByReferrerId } from 'models/referral';
import { getOrCreateUserByBindingId } from 'models/user';
import type { Profile, QueryResolvers } from 'types/graphql';

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	try {
		const { Item: profile } = await getItem(`profile#${user.id}`);
		const mongoProfile = await getOrCreateUserByBindingId(user.id);
		Object.assign(profile, mongoProfile);
		const referrals = await getReferralByReferrerId(mongoProfile.id);
		const { count, points } = referrals.reduce(
			(result, referral) => {
				result.points += referral.claimedPoints;
				result.count++;

				return result;
			},
			{ count: 0, points: 0 },
		);
		profile['referralHistory'] = { count, points, detail: referrals };

		return profile as Profile;
	} catch (err) {
		throw new Error(err);
	}
};
export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};
