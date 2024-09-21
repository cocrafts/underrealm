import type { IUser } from 'models/user';
import { User } from 'models/user';
import { pubsub, topicGenerator } from 'utils/pubsub';
import { generateRandomCode } from 'utils/referral';
import type {
	Profile,
	QueryResolvers,
	ReferralHistoryResolvers,
	SubscriptionResolvers,
} from 'utils/types';

const REFERRAL_CODE_LENGTH = 7;

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	const existUser = await User.findOne({ bindingId: user.id });

	if (existUser) {
		return mapUserToProfile(existUser);
	}

	const newUser = await User.create({
		bindingId: user.id,
		address: user.address,
		name: user.name,
		email: user.email,
		avatarUrl: user.avatarUrl,
		referralCode: generateRandomCode(REFERRAL_CODE_LENGTH),
	});

	return mapUserToProfile(newUser);
};

export const refereeUser: ReferralHistoryResolvers['refereeUser'] = async ({
	refereeId,
}) => {
	const user = await User.findOne({ bindingId: refereeId });
	return mapUserToProfile(user);
};

export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};

const mapUserToProfile = (user: Partial<IUser>): Profile => {
	return {
		id: user.bindingId,
		address: user.address,
		name: user.name,
		email: user.email,
		avatarUrl: user.avatarUrl,
		referralCode: user.referralCode,
	};
};

const counterIncreased: SubscriptionResolvers['counterIncreased'] = {
	subscribe: () => pubsub.asyncIterator(topicGenerator.counterIncreased()),
};

export const UserSubscriptionResolvers = {
	counterIncreased,
};
