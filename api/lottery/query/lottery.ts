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

export const questActions: QueryResolvers['questActions'] = async (
	_,
	// eslint-disable-next-line no-empty-pattern
	{},
	context,
) => {
	const userId = context.user.id;
	return await QuestAction.find<QuestActionType>({ userId });
};

export const quests: QueryResolvers['quests'] = async (_, { status }) => {
	const query = status ? { status } : { status: 'LIVE' };
	const questList = await Quest.find(query);

	const populatedActiveQuests = await Promise.all(
		questList.map((quest) => quest.populate<QuestType>('questActions')),
	);

	return populatedActiveQuests;
};
