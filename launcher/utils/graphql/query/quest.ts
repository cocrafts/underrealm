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
			createdAt
		}
	}
`;

export const questsWithAction = gql`
	query QuestsWithAction($status: QuestStatus = LIVE) {
		questsWithAction(status: $status) {
			id
			title
			description
			type
			url
			status
			points
			createdAt
			questAction {
				id
				userId
				questId
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
			createdAt
		}
	}
`;

export const questActions = gql`
	query QuestActions {
		questActions {
			id
			userId
			questId
			claimedPoints
		}
	}
`;
