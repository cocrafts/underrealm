import { gql } from '@apollo/client';

export const quests = gql`
	query Quests($status: QuestStatus = LIVE) {
		quests(status: $status) {
			id
			title
			description
			type
			url
			status
			points
			questActions {
				user
				quest
				id
				claimedPoints
			}
		}
	}
`;

export const questById = gql`
	query QuestById($id: ID!) {
		quest(id: $id) {
			id
			title
			description
			type
			url
			status
			points
			questActions {
				user
				quest
				id
				claimedPoints
			}
		}
	}
`;

export const questActions = gql`
	query QuestActions {
		questActions {
			id
			user
			quest
			claimedPoints
		}
	}
`;
