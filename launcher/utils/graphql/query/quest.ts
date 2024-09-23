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
			questAction {
				id
				userId
				questId
				claimedPoints
			}
		}
	}
`;
