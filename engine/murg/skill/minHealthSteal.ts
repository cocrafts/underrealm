import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { getClosestEmpty, getFacingIdentifier } from '../utils/ground';
import { createCommandResult, selectGround } from '../utils/helper';
import type { Attribute, CardType, SkillRunner } from '../utils/type';
import { DuelPlace } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'> & {
	minHealth: number;
	cardTypes: CardType[];
};

export const minHealthSteal: SkillRunner = ({ duel, cardId, sourceType }) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const state = getCardState(duel.stateMap, cardId);
	const currentGround = selectGround(duel, state.owner);
	const facingIdentifier = getFacingIdentifier(duel, state.owner, state.id);

	if (!facingIdentifier?.id) return commands;

	const facingState = getCardState(duel.stateMap, facingIdentifier.id);
	const facingCard = getCard(duel.cardMap, facingIdentifier.id);
	const { minHealth, cardTypes }: SkillOptions = card.skill.attribute as never;
	const isCardTypeValid = cardTypes?.indexOf(facingCard.kind) >= 0;
	const isHealthValid = facingState.health <= minHealth;

	if (isCardTypeValid && isHealthValid) {
		createCommand
			.cardMove({
				owner: state.owner,
				target: {
					source: {
						type: sourceType,
						owner: state.owner,
						id: state.id,
						place: state.place,
					},
					from: {
						owner: facingState.owner,
						id: facingState.id,
						place: DuelPlace.Ground,
					},
					to: {
						owner: state.owner,
						index: getClosestEmpty(currentGround),
						place: DuelPlace.Ground,
					},
				},
			})
			.forEach(registerCommand);
	}

	return commands;
};
