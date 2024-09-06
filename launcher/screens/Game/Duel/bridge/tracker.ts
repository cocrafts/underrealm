import { graphQlClient } from 'utils/graphql';
import * as queries from 'utils/graphql/query';
import type { CardDuel } from 'utils/types/graphql';
import { subscribeKey } from 'valtio/utils';

import { bridgeState } from './state';

export const trackDuel = (): void => {
	subscribeKey(bridgeState, 'duelId', async (id) => {
		const response = await graphQlClient.query({
			query: queries.cardDuel,
			variables: { id },
		});

		bridgeState.duel = response.data.cardDuel as CardDuel;
	});
};
