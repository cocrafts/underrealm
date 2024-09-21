import { createQuestAction } from './mutation/quest';
import { makeReferral } from './mutation/referral';
import { quest, questActions, quests, questsWithAction } from './query/quest';
import { referralHistory } from './query/referral';

export const SocialQueryResolvers = {
	quest,
	questActions,
	quests,
	referralHistory,
	questsWithAction,
};

export const SocialMutationResolvers = {
	createQuestAction,
	makeReferral,
};
