import { getItem } from 'aws/dynamo';
import type { IUser } from 'models/user';
import { User } from 'models/user';
import type {
	Profile,
	QueryResolvers,
	ReferralHistoryResolvers,
} from 'types/graphql';
import { generateRandomCode } from 'utils/referral';

const REFERRAL_CODE_LENGTH = 7;

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	const existUser = await User.findOne({ bindingId: user.id });

	if (existUser) {
		return mapUserToProfie(existUser);
	}

	const { Item: dynamoUser } = await getItem(`profile#${user.id}`);
	const newUser = await User.create({
		bindingId: user.id,
		address: dynamoUser.address || '',
		jwt: dynamoUser.jwt || '',
		name: dynamoUser.name || '',
		email: dynamoUser.email || '',
		githubId: dynamoUser.githubId || '',
		githubUrl: dynamoUser.githubUrl || '',
		avatarUrl: dynamoUser.avatar || '',
		mineral: dynamoUser.mineral || 0.0,
		referralCode: generateRandomCode(REFERRAL_CODE_LENGTH),
	});

	return mapUserToProfie(newUser);
};

const mapUserToProfie = (user: Partial<IUser>): Profile => {
	return {
		id: user.id,
		linkedId: user.linkedId,
		address: user.address,
		jwt: user.jwt,
		name: user.name,
		email: user.email,
		githubId: user.githubId,
		githubUrl: user.githubUrl,
		avatarUrl: user.avatarUrl,
		mineral: user.mineral,
		referralCode: user.referralCode,
	};
};

export const refereeUser: ReferralHistoryResolvers['refereeUser'] = async ({
	refereeId,
}) => {
	const { Item: dynamoProfile } = await getItem(`profile#${refereeId}`);
	return {
		id: refereeId,
		name: dynamoProfile.name,
		email: dynamoProfile.email,
		address: dynamoProfile.address,
	};
};

export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};
