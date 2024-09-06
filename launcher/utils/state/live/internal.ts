import { accountState } from 'utils/state/account';
import type { CardDuelHistory, GameInvitation } from 'utils/types/graphql';
import { proxy, subscribe } from 'valtio';

export interface LiveState {
	findingMatch: boolean;
	gameInvites: GameInvitation[];
	gamePlaying?: CardDuelHistory;
}

export const liveState = proxy<LiveState>({
	findingMatch: false,
	gameInvites: [],
	gamePlaying: undefined,
});

let lastAddress = accountState.profile?.address;

subscribe(accountState, () => {
	const nextAddress = accountState.profile?.address;

	if (!!nextAddress && nextAddress !== lastAddress) {
		// graphQlClient.query({ query: queries.cardDuelPlaying }).then((response) => {
		// 	const instance = response?.data?.cardDuelPlaying;
		//
		// 	if (instance) {
		// 		modalActions.show({
		// 			id: 'gamePlayingNotice',
		// 			component: GamePlayingModal,
		// 			context: instance,
		// 			bindingDirection: BindDirections.BottomLeft,
		// 		});
		// 	}
		// });

		lastAddress = nextAddress;
	}
});
