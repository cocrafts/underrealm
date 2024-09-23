import { gql } from '@apollo/client';

export const counterIncreased = gql`
	subscription CounterIncreased {
		counterIncreased
	}
`;

export const gameInvitation = gql`
	subscription GameInvitation($opponent: String!) {
		gameInvitation(opponent: $opponent) {
			id
			game
			owner {
				email
				address
			}
		}
	}
`;

export const matchFind = gql`
	subscription MatchFind($userId: String) {
		matchFind(game: MURG, userId: $userId) {
			id
		}
	}
`;
