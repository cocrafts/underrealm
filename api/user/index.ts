import { Referral } from 'models/referral';
import { User } from 'models/user';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type {
	QueryResolvers,
	ReferralHistoryResolvers,
	SubscriptionResolvers,
} from 'utils/types';

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	const referredHistory = await Referral.findOne({ refereeId: user.id });
	Object.assign(user, { isReferred: !!referredHistory });

	return user;
};

export const refereeUser: ReferralHistoryResolvers['refereeUser'] = async ({
	refereeId,
}) => {
	return await User.findById(refereeId);
};

export const UserQueryResolvers = {
	profile,
};

export const UserMutationResolvers = {};

const counterIncreased: SubscriptionResolvers['counterIncreased'] = {
	subscribe: () => pubsub.asyncIterator(topicGenerator.counterIncreased()),
};

export const UserSubscriptionResolvers = {
	counterIncreased,
};
