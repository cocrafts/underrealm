import { getItem } from 'aws/dynamo';
import { getOrCreateUserByBindingId } from 'models/user';
import type {
	Profile,
	QueryResolvers,
	ReferralHistoryDetailResolvers,
} from 'types/graphql';

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	const mongoProfile = await getOrCreateUserByBindingId(user.id);
	Object.assign(user, mongoProfile);

	return user as Profile;
};

export const refereeUser: ReferralHistoryDetailResolvers['refereeUser'] =
	async ({ refereeId }) => {
		const { Item: dynamoProfile } = await getItem(`profile#${refereeId}`);
		return {
			name: dynamoProfile.name,
			email: dynamoProfile.email,
			address: dynamoProfile.address,
		};
	};

export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};
