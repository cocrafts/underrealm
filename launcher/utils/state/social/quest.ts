import { graphQlClient } from 'utils/graphql';
import * as mutations from 'utils/graphql/mutation';
import * as queries from 'utils/graphql/query';
import type { Quest, QuestAction } from 'utils/types';

export const getActiveQuests = async (): Promise<Quest[]> => {
	const { data } = await graphQlClient.query({
		query: queries.activeQuests,
	});

	return data.activeQuests;
};

export const getInitQuests = async (): Promise<Quest[]> => {
	const { data } = await graphQlClient.query({
		query: queries.initQuests,
	});

	return data.initQuests;
};

export const getDisableQuests = async (): Promise<Quest[]> => {
	const { data } = await graphQlClient.query({
		query: queries.disableQuests,
	});

	return data.disableQuests;
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
