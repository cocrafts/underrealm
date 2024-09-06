import type { ObservableSubscription } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from 'stacks/Browser/shared';
import { graphQlClient } from 'utils/graphql';
import * as mutations from 'utils/graphql/mutation';
import * as subscriptions from 'utils/graphql/subscription';
import type { CardDuelHistory } from 'utils/types/graphql';
import { MetacraftGames } from 'utils/types/graphql';

import { liveState } from './internal';

export const sendGameInvitation = async (opponent: string): Promise<void> => {
	await graphQlClient.mutate({
		mutation: mutations.inviteGame,
		variables: {
			input: {
				game: MetacraftGames.Murg,
				opponent,
			},
		},
	});
};

export const acceptGameInvitation = async (
	invitationId: string,
): Promise<void> => {
	await graphQlClient.mutate({
		mutation: mutations.acceptGame,
		variables: { invitationId },
	});

	liveState.gameInvites = liveState.gameInvites.filter(
		(i) => i.id !== invitationId,
	);
};

export const resumePlayingGame = async (
	history: CardDuelHistory,
): Promise<void> => {
	navigate('Game', { id: history.id } as never);
};

let findMatchSubscription: ObservableSubscription;

export const matchFind = (userId: string): void => {
	findMatchSubscription?.unsubscribe?.();
	findMatchSubscription = graphQlClient
		.subscribe({
			query: subscriptions.matchFind,
			variables: { userId },
		})
		.subscribe(async ({ data }) => {
			findMatchSubscription?.unsubscribe?.();
			liveState.findingMatch = false;
			await AsyncStorage.setItem('murgJwt', data.jwt);
			navigate('Game', {
				screen: 'Duel',
				params: { id: data.matchFind.id },
			} as never);
		});

	liveState.findingMatch = true;
};

export const stopMatchFind = (): void => {
	findMatchSubscription?.unsubscribe?.();
	graphQlClient.mutate({ mutation: mutations.stopMatchFind });
	liveState.findingMatch = false;
};
