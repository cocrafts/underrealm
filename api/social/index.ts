import { createQuestAction, deleteQuest, updateQuest } from './mutation/quest';
import {
	activeQuests,
	disableQuests,
	initQuests,
	quest,
	questActions,
} from './query/quest';

export const SocialQueryResolvers = {
	quest,
	questActions,
	activeQuests,
	initQuests,
	disableQuests,
};

export const SocialMutationResolvers = {
	createQuestAction,
	deleteQuest,
	updateQuest,
	makeReferral,
};
