import { graphQlClient } from 'utils/graphql';
import * as queries from 'utils/graphql/query';
import type { Profile } from 'utils/types/graphql';

import { buddyState } from './internal';

const fetchBuddies = async (): Promise<Profile[]> => {
	try {
		const { data } = await graphQlClient.query({ query: queries.buddies });
		const buddies = data?.buddies || [];

		buddyState.list = buddies;
		return buddies;
	} catch (e) {
		console.log(e);
	} finally {
		buddyState.loading = false;
	}

	return [];
};

export const buddyActions = {
	fetchBuddies,
};

export * from './internal';
