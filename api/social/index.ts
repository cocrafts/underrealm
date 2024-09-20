import { createQuestAction } from './mutation/quest';
import { makeReferral } from './mutation/referral';
import { quest, questActions, quests } from './query/quest';
import { referralHistory } from './query/referral';

export const SocialQueryResolvers = {
	quest,
	questActions,
	quests,
	referralHistory,
};

export const SocialMutationResolvers = {
	createQuestAction,
	makeReferral,
};
