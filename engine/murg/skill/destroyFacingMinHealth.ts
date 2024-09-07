import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifiers } from '../utils/ground';
import { createCommandResult } from '../utils/helper';
import type { CardType, SkillRunner } from '../utils/type';
import { DuelPlace } from '../utils/type';

interface SkillOptions {
	minHealth: number;
	unitTypes: CardType[];
}

export const destroyFacingMinHealth: SkillRunner = ({
	duel,
	cardId,
	sourceType,
}) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const { minHealth, unitTypes }: SkillOptions = card.skill.attribute as never;
	const state = getCardState(duel.stateMap, cardId);
	const [facingIdentifier] = getFacingIdentifiers(
		duel,
		state.owner,
		state.id,
		0,
	);

	if (!facingIdentifier?.id) return commands;

	const facingCard = getCard(duel.cardMap, facingIdentifier.id);
	const facingState = getCardState(duel.stateMap, facingIdentifier.id);
	const isMinHealthValid = facingState.health <= minHealth;
	const isUnitValid = unitTypes.indexOf(facingCard.kind) >= 0;

	if (isMinHealthValid && isUnitValid) {
		createCommand
			.cardMutate({
				owner: state.owner,
				target: {
					source: {
						type: sourceType,
						owner: state.owner,
						place: state.place,
						id: state.id,
					},
					to: {
						owner: facingIdentifier.owner,
						place: DuelPlace.Ground,
						id: facingIdentifier.id,
					},
				},
				payload: {
					health: 0,
				},
			})
			.forEach(registerCommand);
	}

	return commands;
};
