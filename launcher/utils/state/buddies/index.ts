import type { Profile } from 'utils/graphql';

const fetchBuddies = async (): Promise<Profile[]> => {
	// TODO: Fix error "Unexpected <EOF> while using graphql"

	// try {
	// 	const { data } = await graphQlClient.query({ query: queries.buddies });
	// 	const buddies = data?.buddies || [];

	// 	buddyState.list = buddies;
	// 	return buddies;
	// } catch (e) {
	// 	console.log(e);
	// } finally {
	// 	buddyState.loading = false;
	// }

	return [];
};

export const buddyActions = {
	fetchBuddies,
};

export * from './internal';
