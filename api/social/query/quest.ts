import { Quest, QuestAction } from 'models/quest';
import type {
	QueryResolvers,
	Quest as QuestType,
	QuestAction as QuestActionType,
} from 'types/graphql';

export const quest: QueryResolvers['quest'] = async (
	_,
	{ id }: { id: string },
) => {
	const result = await Quest.findById(id)
		.populate<QuestType>('questActions')
		.exec();
	return result;
};

export const activeQuests: QueryResolvers['activeQuests'] = async () => {
	const activeQuests = await Quest.find({
		status: 'LIVE',
	});

	const populatedActiveQuests = await Promise.all(
		activeQuests.map((activeQuest) =>
			activeQuest.populate<QuestType>('questActions'),
		),
	);

	return populatedActiveQuests;
};

export const initQuests: QueryResolvers['initQuests'] = async () => {
	return await Quest.find<QuestType>({ status: 'INIT' });
};

export const disableQuests: QueryResolvers['disableQuests'] = async () => {
	return await Quest.find<QuestType>({ status: 'DISABLE' });
};

export const questActions: QueryResolvers['questActions'] = async (
	_,
	// eslint-disable-next-line no-empty-pattern
	{},
	context,
) => {
	const userId = context.user.id;
	return await QuestAction.find<QuestActionType>({ userId });
};
