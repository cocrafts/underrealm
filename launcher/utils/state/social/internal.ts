import type { Quest } from 'utils/types/graphql';
import { proxy } from 'valtio';

import {
	createQuestAction,
	getActiveDoneQuests,
	getActiveQuests,
	getDisableQuests,
	getInitQuests,
} from './quest';

export interface QuestState {
	quests: Quest[];
	activeDoneQuests: Quest[];
}

export const questState = proxy<QuestState>({
	quests: [],
	activeDoneQuests: [],
});

export const questActions = {
	getQuests: async (status?: string) => {
		let quests = [];
		console.log('status', status);
		if (status === 'INIT') {
			quests = await getInitQuests();
			console.log();
		} else if (status === 'DISABLE') {
			quests = await getDisableQuests();
		} else {
			quests = await getActiveQuests();
		}
		questState.quests = quests;
	},
	getDoneQuests: async () => {
		const doneQuests = await getActiveDoneQuests();
		const activeDoneQuests = questState.quests.filter((quest) =>
			doneQuests.some((questAction) => questAction.questId === quest.id),
		);

		questState.activeDoneQuests = activeDoneQuests;
	},
	verifyAndClaimQuest: async (questId: string, claimedPoints: number) => {
		const questAction = await createQuestAction(questId, claimedPoints);

		const activeDoneQuests = questState.quests.find(
			(quest) => questAction.questId === quest.id,
		);

		questState.activeDoneQuests = [
			...questState.activeDoneQuests,
			activeDoneQuests,
		];
	},
};
