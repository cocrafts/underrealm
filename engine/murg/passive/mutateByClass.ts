import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifier } from '../utils/ground';
import { emptyPassive } from '../utils/helper';
import type { Attribute, ClassType, PassiveRunner } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'> & {
	isTargetEnemy: boolean;
	classTypes: ClassType[];
};

export const mutateByClass: PassiveRunner = ({ duel, cardId }) => {
	const card = getCard(duel.cardMap, cardId);
	const attr: SkillOptions = card.skill.passiveAttribute as never;
	const state = getCardState(duel.stateMap, cardId);
	const facingIdentifier = getFacingIdentifier(duel, state.owner, cardId);

	if (!facingIdentifier?.id) return [emptyPassive, emptyPassive];

	const facingCard = getCard(duel.cardMap, facingIdentifier.id);
	const isClassValid = attr.classTypes.indexOf(facingCard?.class) >= 0;

	if (!isClassValid) return [emptyPassive, emptyPassive];

	const payload = {
		attack: attr.attack || 0,
		defense: attr.defense || 0,
		health: attr.health || 0,
	};

	return attr.isTargetEnemy ? [emptyPassive, payload] : [payload, emptyPassive];
};
