import { Quest, QuestAction } from 'models/quest';
import type { RootFilterQuery } from 'mongoose';
import type {
	QueryResolvers,
	Quest as QuestType,
	QuestAction as QuestActionType,
} from 'types/graphql';

export const quest: QueryResolvers['quest'] = async (
	_,
	{ id }: { id: string },
) => {
	return await Quest.findById(id);
};

export const activeQuests: QueryResolvers['activeQuests'] = async () => {
	return await Quest.find({ status: 'LIVE' } as RootFilterQuery<QuestType>);
};

export const initQuests: QueryResolvers['initQuests'] = async () => {
	return await Quest.find({ status: 'INIT' } as RootFilterQuery<QuestType>);
};

export const disableQuests: QueryResolvers['disableQuests'] = async () => {
	return await Quest.find({ status: 'DISABLE' } as RootFilterQuery<QuestType>);
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
