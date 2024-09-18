import { getUserById } from 'models/user';
import type {
	QueryResolvers,
	ReferralHistoryDetailResolvers,
} from 'types/graphql';

const profile: QueryResolvers['profile'] = async (root, _, { user }) => {
	try {
		return await getUserById(user.id);
	} catch (err) {
		throw new Error(err);
	}
};
export const UserQueryResolver = {
	profile,
};
export const UserMutationResolver = {};
