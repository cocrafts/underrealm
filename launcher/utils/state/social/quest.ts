import { graphQlClient } from 'utils/graphql';
import * as mutations from 'utils/graphql/mutation';
import * as queries from 'utils/graphql/query';
import type { Quest, QuestAction } from 'utils/types';

export const getQuests = async (): Promise<Quest[]> => {
	const { data } = await graphQlClient.query({
		query: queries.quests,
	});

	return data.quests;
};

export const getActiveQuests = async (): Promise<Quest[]> => {
	const { data } = await graphQlClient.query({
		query: queries.activeQuests,
	});

	return data.quests;
};

export const createQuestAction = async (
	questId: string,
	claimedPoints: number,
): Promise<QuestAction> => {
	const { data } = await graphQlClient.mutate({
		mutation: mutations.createQuestAction,
		variables: {
			questId,
			claimedPoints,
		},
	});

	return data.createQuestAction;
};

export const getActiveDoneQuests = async (): Promise<QuestAction[]> => {
	const { data } = await graphQlClient.query({
		query: queries.questActions,
	});

	return data.questActions;
};
