import { Quest, QuestAction } from 'models/quest';

import type { MutationResolvers } from './../../types/graphql';

export const createQuest = async (
	_,
	{ title, description, type, url, points },
) => {
	const newQuest = new Quest({
		title,
		description,
		type,
		status: 'INIT',
		url,
		points,
	});

	return await newQuest.save();
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
	{ questId, claimedPoints },
	context,
) => {
	try {
		const { user } = context;
		const userId = user.id;

		const result = new QuestAction({ questId, userId, claimedPoints });
		return await result.save();
	} catch (err) {
		throw new Error(err);
	}
};
