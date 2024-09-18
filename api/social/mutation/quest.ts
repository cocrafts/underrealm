import { Quest, QuestAction } from 'models/quest';

import type { MutationResolvers } from './../../types/graphql';

export const createQuest = async (
	_,
	{ title, description, type, url, points },
) => {
	await Quest.create({
		title,
		description,
		type,
		status: 'INIT',
		url,
		points,
	});
};

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
		const userId = context.user.id;
		const quest = await Quest.findById(questId);
		const claimedPoints = quest.points;

		await QuestAction.create({ questId, userId, claimedPoints });
	} catch (err) {
		throw new Error(err);
	}
};
