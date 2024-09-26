import { Quest } from './model';

export const getQuestList = async () => {
	return Quest.find();
};
