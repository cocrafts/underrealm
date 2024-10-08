import { User } from 'models/user';
import { requireAuth } from 'utils/context';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type {
	QueryResolvers,
	ReferralHistoryResolvers,
	SubscriptionResolvers,
} from 'utils/types';

const profile: QueryResolvers['profile'] = requireAuth(
	async (root, _, { user }) => {
		return user;
	},
);

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
	subscribe: async () => {
		return await pubsub.subscribe(topicGenerator.counterIncreased());
	},
};

export const UserSubscriptionResolvers = {
	counterIncreased,
};
