import { getCardState } from '../utils/card';
import { emptyPassive } from '../utils/helper';
import type { PassiveRunner } from '../utils/type';

export const gainAttackByRemainingHealth: PassiveRunner = ({
	duel,
	cardId,
}) => {
	const state = getCardState(duel.stateMap, cardId);

	return [
		{
			attack: state.health,
			defense: 0,
			health: 0,
		},
		emptyPassive,
	];
};
