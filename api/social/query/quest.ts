import { Quest, QuestAction } from 'models/quest';
import {
	type QueryResolvers,
	type Quest as QuestType,
	type QuestAction as QuestActionType,
	QuestStatus,
} from 'types/graphql';
import { logger } from 'utils/logger';

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
	return await Quest.find(query);
};

export const questsWithAction: QueryResolvers['questsWithAction'] = async (
	_,
	{ status },
	{ user },
) => {
	logger.info('user id', user);

	const result = await Quest.aggregate([
		{
			$match: {
				$expr: { $eq: ['$status', status || QuestStatus.Live] },
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
									{ $eq: ['$userId', user.id] },
								],
							},
						},
					},
				],
				as: 'questAction',
			},
		},
	]);

	logger.info('hi', result);

	return result;
};
