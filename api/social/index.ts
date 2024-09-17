import { createQuestAction } from './mutation/quest';
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
};
