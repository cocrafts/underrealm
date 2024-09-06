import { gql } from '@apollo/client';

export const gameInvitations = gql`
	query GameInvitations {
		gameInvitations {
			id
			game
			owner {
				id
				address
				name
				avatarUrl
			}
		}
	}
`;
