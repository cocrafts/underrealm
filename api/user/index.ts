import { getItem } from 'aws/dynamo';
import { getOrCreateUserByBindingId } from 'models/user';
import type { Profile, QueryResolvers } from 'types/graphql';

const getUser: QueryResolvers['profile'] = async (root, _, { user }) => {
	const { Item: profile } = await getItem(`profile#${user.id}`);
	const mongoProfile = await getOrCreateUserByBindingId(user.id);
	Object.assign(profile, mongoProfile);
	return profile as Profile;
};
export const UserQueryResolver = {
	getUser,
};
export const UserMutationResolver = {};
