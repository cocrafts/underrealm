import { Quest } from 'models/quest';
import { type QueryResolvers, QuestStatus } from 'utils/types';

export const quests: QueryResolvers['questsWithAction'] = async (
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
				questAction: { $ifNull: ['$questAction', null] },
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
