import { Quest } from 'models/quest';
import { type QueryResolvers, QuestStatus } from 'utils/types';

export const quests: QueryResolvers['questsWithAction'] = async (
	_,
	{ status },
	{ user },
) => {
	// TODO: this aggregate should follow resolver chains
	const quests = await Quest.aggregate([
		{
			$match: {
				status: status || QuestStatus.Live,
			},
		},
		{
			$lookup: {
				from: 'questactions',
				let: { questId: '$_id' },
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
				action: { $arrayElemAt: ['$questAction', 0] },
			},
		},
		{
			$addFields: {
				action: { $ifNull: ['$questAction', null] },
			},
		},
	]);

	console.log(quests);

	const result = quests.map((quest) => {
		return {
			...quest,
			id: quest._id,
			action: quest.action ? { ...quest.action, id: quest.action._id } : null,
		};
	});

	return result;
};
