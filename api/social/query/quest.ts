import type { QueryResolvers } from 'types/graphql';

export const quests: QueryResolvers['quests'] = () => {
	return [{ id: '111' }, { id: '222' }, { id: '333' }];
};
