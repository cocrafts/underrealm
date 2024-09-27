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

export const updateQuestById = async ({
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

export const updateQuestByCode = async ({
	code,
	title,
	description,
	type,
	status,
	url,
	points,
}: {
	code: string;
	title: string;
	description: string;
	type: string;
	status: string;
	url: string;
	points: number;
}) => {
	await Quest.findOneAndUpdate(
		{ code },
		{
			title,
			description,
			type,
			status,
			url,
			points,
		},
	);
};

export const deleteQuestById = async (id: string) => {
	await Quest.findByIdAndDelete(id);
};

export const deleteQuestByCode = async (code: string) => {
	await Quest.findOneAndDelete({ code });
};
