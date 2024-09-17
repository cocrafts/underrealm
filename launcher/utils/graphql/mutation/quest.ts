import { gql } from '@apollo/client';

export const createQuestAction = gql`
	mutation CreateQuestAction($questId: ID!, $claimedPoints: Int!) {
		createQuestAction(questId: $questId, claimedPoints: $claimedPoints) {
			id
			userId
			questId
			claimedPoints
		}
	}
`;
