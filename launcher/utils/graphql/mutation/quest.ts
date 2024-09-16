import { gql } from '@apollo/client';

export const createQuest = gql`
	mutation CreateQuest(
		$title: String!
		$description: String!
		$type: String!
		$url: String!
		$points: Int!
	) {
		createQuest(
			title: $title
			description: $description
			type: $type
			url: $url
			points: $points
		) {
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

export const updateQuest = gql`
	mutation UpdateQuest($id: ID!, $status: String!) {
		updateQuest(id: $id, status: $status) {
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

export const deleteQuest = gql`
	mutation DeleteQuest($id: ID!) {
		deleteQuest(id: $id)
	}
`;

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
