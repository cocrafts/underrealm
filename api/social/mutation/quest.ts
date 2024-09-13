import { Quest, QuestAction } from 'models/quest';

import type { MutationResolvers } from './../../types/graphql';

export const createQuest: MutationResolvers['createQuest'] = async (
	_,
	{
		title,
		description,
		type,
		url,
		points,
	}: {
		title: string;
		description: string;
		type: string;
		url: string;
		points: number;
	},
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

export const updateQuest: MutationResolvers['updateQuest'] = async (
	_,
	{ id, status }: { id: string; status: string },
) => {
	return await Quest.findByIdAndUpdate(id, { status }, { new: true });
};

export const deleteQuest: MutationResolvers['deleteQuest'] = async (
	_,
	{ id }: { id: string },
) => {
	const result = await Quest.findByIdAndDelete(id);
	return !!result;
};

export const createQuestAction: MutationResolvers['createQuestAction'] = async (
	_,
	{ questId, claimedPoints }: { questId: string; claimedPoints: number },
	context,
) => {
	try {
		const { user } = context;
		const userId = user.id;

		const result = new QuestAction({ questId, userId, claimedPoints });
		return await result.save();
	} catch (err) {
		// Handle duplicate action error
		throw new Error('User has already interacted with this quest.');
	}
};
