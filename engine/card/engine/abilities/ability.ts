import type { AbilityRunner } from '../../types';

import mutate from './mutate';

export const runAbility: AbilityRunner = (payload) => {
	switch (payload?.ability?.id) {
		case 'mutate':
			return mutate(payload);
		default:
			return [];
	}
};
