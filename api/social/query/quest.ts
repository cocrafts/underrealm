import { Quest } from 'models/quest';
import { virtualId } from 'models/utils';
import type { QueryResolvers } from 'utils/types';
import { QuestStatus } from 'utils/types';

export const quests: QueryResolvers['questsWithAction'] = async (
	_,
	{ status },
	{ user },
) => {
	// TODO: this aggregate should follow resolver chains
	let quests = await Quest.aggregate([
		{
			$match: { status: status || QuestStatus.Live },
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
		{ $addFields: { action: { $arrayElemAt: ['$questAction', 0] } } },
		{ $addFields: { action: { $ifNull: ['$questAction', null] } } },
	]);

	quests = quests.map((quest) => {
		const action = quest?.action?.length > 0 ? quest.action[0] : null;
		return { ...virtualId(quest), action: virtualId(action) };
	});

	return quests;
};
