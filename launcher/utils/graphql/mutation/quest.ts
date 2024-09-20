import { gql } from '@apollo/client';

export const createQuestAction = gql`
	mutation CreateQuestAction($questId: ID!) {
		createQuestAction(questId: $questId) {
			id
			user
			quest
			claimedPoints
		}
	}
`;
