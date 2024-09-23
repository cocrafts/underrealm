import { Quest, QuestAction } from 'models/quest';
import { User } from 'models/user';
import type { MutationResolvers } from 'utils/types';

export const createQuestAction: MutationResolvers['createQuestAction'] = async (
	_,
	{ questId },
	{ user },
) => {
	try {
		const userId = user.bindingId;
		const quest = await Quest.findById(questId);
		const claimedPoints = quest.points;

		const questAction = await QuestAction.create({
			questId,
			userId,
			claimedPoints,
			createdAt: new Date(),
		});

		await User.updateOne(
			{ bindingId: userId },
			{ $inc: { points: claimedPoints } },
		);

		return questAction as never;
	} catch (err) {
		throw new Error(err);
	}
};
