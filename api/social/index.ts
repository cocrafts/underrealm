import { makeReferral } from './mutation/referral';
import { quests } from './query/quest';

export const SocialQueryResolvers = {
	quests,
};

export const SocialMutationResolvers = {
	makeReferral,
};
