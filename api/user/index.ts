import { getItem } from 'aws/dynamo';
import { getOrCreateUserByBindingId } from 'models/user';
import type { Profile, QueryResolvers } from 'types/graphql';

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	try {
		const { Item: profile } = await getItem(`profile#${user.id}`);
		const mongoProfile = await getOrCreateUserByBindingId(user.id);
		Object.assign(profile, mongoProfile);
		return profile as Profile;
	} catch (err) {
		throw new Error(err);
	}
};
export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};
