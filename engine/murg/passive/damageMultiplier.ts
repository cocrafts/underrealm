import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifier } from '../utils/ground';
import { emptyPassive } from '../utils/helper';
import type { CardType, PassiveRunner } from '../utils/type';

interface Attributes {
	multiplyFactor: number;
	cardTypes: CardType[];
}

export const damageMultiplier: PassiveRunner = ({ duel, cardId }) => {
	const card = getCard(duel.cardMap, cardId);
	const { multiplyFactor, cardTypes }: Attributes = card.skill
		.passiveAttribute as never;
	const state = getCardState(duel.stateMap, cardId);
	const facingIdentifier = getFacingIdentifier(duel, state.owner, cardId);

	if (!facingIdentifier?.id) return [emptyPassive, emptyPassive];

	const facingCard = getCard(duel.cardMap, facingIdentifier.id);
	const isFacingTypeValid = cardTypes.indexOf(facingCard.kind) >= 0;
	const additionalAttack = isFacingTypeValid
		? state.attack * (multiplyFactor - 1)
		: 0;

	return [
		{
			attack: additionalAttack,
			defense: 0,
			health: 0,
		},
		emptyPassive,
	];
};
