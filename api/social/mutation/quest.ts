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

		const profile = await User.findOneAndUpdate(
			{ bindingId: userId },
			{ $inc: { points: claimedPoints } },
		);

		const questAction = await QuestActionModel.create({
			quest: questId,
			user: userId,
			claimedPoints,
			createdAt: new Date(),
		});

		quest.questActions.push(questAction);
		profile.questActions.push(questAction);

		await quest.save();
		await profile.save();

		return questAction;
	} catch (err) {
		throw new Error(err);
	}
};
