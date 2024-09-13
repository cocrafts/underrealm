import type { Quest } from 'utils/types/graphql';
import { proxy } from 'valtio';

import {
	createQuestAction,
	getActiveDoneQuests,
	getActiveQuests,
} from './quest';

export interface QuestState {
	activeQuests: Quest[];
	activeDoneQuests: Quest[];
}

export const questState = proxy<QuestState>({
	activeQuests: [],
	activeDoneQuests: [],
});

export const questActions = {
	getActiveQuests: async () => {
		const activeQuests = await getActiveQuests();
		questState.activeQuests = activeQuests;
	},
	getDoneQuests: async () => {
		const doneQuests = await getActiveDoneQuests();
		const activeDoneQuests = questState.activeQuests.filter((quest) =>
			doneQuests.some((questAction) => questAction.questId === quest.id),
		);

		questState.activeDoneQuests = activeDoneQuests;
	},
	verifyAndClaimQuest: async (questId: string, claimedPoints: number) => {
		const questAction = await createQuestAction(questId, claimedPoints);

		const activeDoneQuests = questState.activeQuests.find(
			(quest) => questAction.questId === quest.id,
		);

		questState.activeDoneQuests = [
			...questState.activeDoneQuests,
			activeDoneQuests,
		];
	},
};
