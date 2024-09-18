import { createQuestAction, deleteQuest, updateQuest } from './mutation/quest';
import { makeReferral } from './mutation/referral';
import {
	activeQuests,
	disableQuests,
	initQuests,
	quest,
	questActions,
} from './query/quest';
import { referralHistory } from './query/referral';

export const SocialQueryResolvers = {
	quest,
	questActions,
	activeQuests,
	initQuests,
	disableQuests,
	referralHistory,
};

export const SocialMutationResolvers = {
	createQuestAction,
	deleteQuest,
	updateQuest,
	makeReferral,
};
