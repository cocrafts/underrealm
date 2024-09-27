import { Quest } from './model';

export const getQuestList = async () => {
	const quests = await Quest.find();
	return quests;
};
