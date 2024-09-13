import {
	createQuest,
	createQuestAction,
	deleteQuest,
	updateQuest,
} from './mutation/quest';
import { makeReferral } from './mutation/referral';
import { activeQuests, quest, questActions, quests } from './query/quest';

export const SocialQueryResolvers = {
	quests,
	quest,
	questActions,
	activeQuests,
};

export const SocialMutationResolvers = {
	createQuest,
	createQuestAction,
	deleteQuest,
	updateQuest,
	makeReferral,
};
