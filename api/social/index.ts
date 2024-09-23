import { createQuestAction } from './mutation/quest';
import { makeReferral } from './mutation/referral';
import { quests } from './query/quest';
import { referralHistory } from './query/referral';

export const SocialQueryResolvers = {
	quests,
	referralHistory,
};

export const SocialMutationResolvers = {
	createQuestAction,
	makeReferral,
};
