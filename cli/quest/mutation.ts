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
		questActions: [],
	});
};
