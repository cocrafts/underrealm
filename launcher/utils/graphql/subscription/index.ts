import { gql } from '@apollo/client';

export const counterIncreased = gql`
	subscription CounterIncreased {
		counterIncreased
	}
`;

export const findMatch = gql`
	subscription FindMatch($userId: String!) {
		findMatch(userId: $userId) {
			id
		}
	}
`;
