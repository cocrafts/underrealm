import type { Profile } from 'utils/graphql';
import { graphQlClient } from 'utils/graphql';
import * as queries from 'utils/graphql/query';
import { extractJwt } from 'utils/lib';

import { accountState } from './internal';

// TODO: should deprecated this profile query
export const syncProfile = async (): Promise<Profile | null> => {
	const jwt = await extractJwt();
	accountState.loading = !!jwt;

	if (!jwt) return null;

	try {
		const { data } = await graphQlClient.query({ query: queries.profile });
		const profile = data?.profile || {};
		accountState.profile = profile;

		return profile;
	} catch (e) {
		console.log(e);
	} finally {
		accountState.loading = false;
	}

	return null;
};
