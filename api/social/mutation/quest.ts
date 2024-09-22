import { Quest, QuestAction } from 'models/quest';
import type { MutationResolvers } from 'utils/types';

export const updateQuest = async (_, { id, status }) => {
	return await Quest.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteQuest = async (_, { id }) => {
	const result = await Quest.findByIdAndDelete(id);
	return !!result;
};

export const createQuestAction: MutationResolvers['createQuestAction'] = async (
	_,
	{ questId },
	context,
) => {
	try {
		const userId = context.user.bindingId;
		const quest = await Quest.findById(questId);
		const claimedPoints = quest.points;

		const questAction = await QuestAction.create({
			questId,
			userId,
			claimedPoints,
			createdAt: new Date(),
		});

		quest.questActions.push(questAction);
		await quest.save();

		return questAction as never;
	} catch (err) {
		throw new Error(err);
	}
};
