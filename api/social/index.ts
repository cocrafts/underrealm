import { createQuestAction, deleteQuest, updateQuest } from './mutation/quest';
import { makeReferral } from './mutation/referral';
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
