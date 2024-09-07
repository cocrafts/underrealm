import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifier } from '../utils/ground';
import { emptyPassive } from '../utils/helper';
import type { Attribute, PassiveRunner } from '../utils/type';

interface BasicAttributes {
	defense: number;
}

export const ignoreEnemyDefense: PassiveRunner = ({ duel, cardId }) => {
	const card = getCard(duel.cardMap, cardId);
	const { defense }: BasicAttributes = card.skill.passiveAttribute as never;
	const enemyPassive: Attribute = {
		attack: 0,
		health: 0,
		defense: 0,
	};

	if (defense) {
		enemyPassive.defense = Math.min(0, -defense);
	} else {
		const state = getCardState(duel.stateMap, cardId);
		const facingIdentifier = getFacingIdentifier(duel, state.owner, cardId);

		if (!facingIdentifier?.id) return [emptyPassive, emptyPassive];

		const facingState = getCardState(duel.stateMap, facingIdentifier.id);
		const facingDefense = facingState?.defense || 0;

		enemyPassive.defense = Math.min(0, -facingDefense);
	}

	return [emptyPassive, enemyPassive];
};
