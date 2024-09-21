import { Quest, QuestAction as QuestActionModel } from 'models/quest';
import { User } from 'models/user';

import type { MutationResolvers } from './../../types/graphql';

export const createQuestAction: MutationResolvers['createQuestAction'] = async (
	_,
	{ questId },
	{ user },
) => {
	try {
		const userId = user.id;

		const quest = await Quest.findById(questId);
		const claimedPoints = quest.points;

		const questAction = await QuestActionModel.create({
			quest: questId,
			user: userId,
			claimedPoints,
			createdAt: new Date(),
		});

		await User.updateOne(
			{ bindingId: userId },
			{ $inc: { points: claimedPoints } },
		);

		return questAction;
	} catch (err) {
		throw new Error(err);
	}
};
