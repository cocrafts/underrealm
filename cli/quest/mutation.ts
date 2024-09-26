import { Quest } from './model';

export const createQuest = async ({
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
}) => {
	await Quest.create({
		title,
		description,
		type,
		status: 'INIT',
		url,
		points,
		createdAt: new Date(),
	});
};

export const updateQuest = async ({
	id,
	title,
	description,
	type,
	status,
	url,
	points,
}: {
	id: string;
	title: string;
	description: string;
	type: string;
	status: string;
	url: string;
	points: number;
}) => {
	await Quest.findByIdAndUpdate(id, {
		title,
		description,
		type,
		status,
		url,
		points,
	});
};

export const updateQuestStatus = async (id: string, status: string) => {
	await Quest.findByIdAndUpdate(id, {
		status,
	});
};

export const deleteQuest = async (id: string) => {
	await Quest.findByIdAndDelete(id);
};
