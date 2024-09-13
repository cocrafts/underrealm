import { Quest, QuestAction } from 'models/quest';
import type { RootFilterQuery } from 'mongoose';
import type {
	QueryResolvers,
	Quest as QuestType,
	QuestAction as QuestActionType,
} from 'types/graphql';

export const quests: QueryResolvers['quests'] = async () => {
	return await Quest.find();
};

export const quest: QueryResolvers['quest'] = async (
	_,
	{ id }: { id: string },
) => {
	return await Quest.findById(id);
};

export const activeQuests: QueryResolvers['activeQuests'] = async () => {
	return await Quest.find({ status: 'LIVE' } as RootFilterQuery<QuestType>);
};

export const questActions: QueryResolvers['questActions'] = async (
	_,
	// eslint-disable-next-line no-empty-pattern
	{},
	context,
) => {
	const { user } = context;
	const userId = user.id;

	return await QuestAction.find({ userId } as RootFilterQuery<QuestActionType>);
};
