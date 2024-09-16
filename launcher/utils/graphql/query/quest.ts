import { gql } from '@apollo/client';

export const activeQuests = gql`
	query ActiveQuests {
		activeQuests {
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

export const initQuests = gql`
	query InitQuests {
		initQuests {
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

export const disableQuests = gql`
	query DisableQuests {
		disableQuests {
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
