import { getCard, getCardState } from '../utils/card';
import { emptyPassive } from '../utils/helper';
import type { PassiveRunner } from '../utils/type';

export const gainDefenseByEnemyMissingHealth: PassiveRunner = ({
	duel,
	cardId,
}) => {
	const card = getCard(duel.cardMap, cardId);
	const state = getCardState(duel.stateMap, cardId);
	const missingHealth = card.attribute.health - state.health;

	return [
		{
			attack: 0,
			health: 0,
			defense: Math.max(0, missingHealth),
		},
		emptyPassive,
	];
};
