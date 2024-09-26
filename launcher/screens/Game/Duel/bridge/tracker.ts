// import type { CardDuel } from 'utils/graphql';
// import { graphQlClient } from 'utils/graphql';
// import * as queries from 'utils/graphql/query';
import { subscribeKey } from 'valtio/utils';

import { bridgeState } from './state';

export const trackDuel = (): void => {
	// TODO: Fix error "Unexpected <EOF> while using graphql"
	subscribeKey(bridgeState, 'duelId', async () => {
		// const response = await graphQlClient.query({
		// 	query: queries.cardDuel,
		// 	variables: { id },
		// });
		// bridgeState.duel = response.data.cardDuel as CardDuel;
	});
};
