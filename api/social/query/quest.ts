import { Quest, QuestAction } from 'models/quest';
import {
	type QueryResolvers,
	type Quest as QuestType,
	type QuestAction as QuestActionType,
	QuestStatus,
} from 'utils/types';

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
	const query = status ? { status } : { status: QuestStatus.Live };
	return await Quest.find(query);
};

export const questsWithAction: QueryResolvers['questsWithAction'] = async (
	_,
	{ status },
	{ user },
) => {
	const quests = await Quest.aggregate([
		{
			$match: {
				status: status || QuestStatus.Live,
			},
		},
		{
			$lookup: {
				from: 'questactions',
				let: { questId: '$_id' as string },
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$$questId', '$questId'] },
									{ $eq: ['$userId', user._id] },
								],
							},
						},
					},
					{ $limit: 1 },
				],
				as: 'questAction',
			},
		},
		{
			$addFields: {
				questAction: { $arrayElemAt: ['$questAction', 0] },
			},
		},
		{
			$addFields: {
				questAction: { $ifNull: ['$questAction', null] }, // Ensure questAction is null if not found
			},
		},
	]);

	const result = quests.map((quest) => {
		return {
			...quest,
			id: quest._id,
			questAction: quest.questAction
				? { ...quest.questAction, id: quest.questAction._id }
				: null,
		};
	});

	return result;
};
