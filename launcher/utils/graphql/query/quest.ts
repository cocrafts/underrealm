import { gql } from '@apollo/client';

export const quests = gql`
	query Quests {
		quests {
			id
			title
			description
			type
			url
			status
			points
		}
	}
`;

export const activeQuests = gql`
	query ActiveQuests {
		quests {
			id
			title
			description
			type
			url
			status
			points
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
