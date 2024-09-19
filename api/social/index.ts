import { createQuestAction } from './mutation/quest';
import { quest, questActions, quests } from './query/quest';

export const SocialQueryResolvers = {
	quest,
	questActions,
	quests,
};

export const SocialMutationResolvers = {
	createQuestAction,
};
