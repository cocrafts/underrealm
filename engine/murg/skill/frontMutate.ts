import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifiers } from '../utils/ground';
import { createCommandResult } from '../utils/helper';
import type { Attribute, SkillRunner } from '../utils/type';
import { DuelPlace } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'> & { radius: number };

export const frontMutate: SkillRunner = ({ duel, cardId, sourceType }) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const state = getCardState(duel.stateMap, cardId);
	const attr: SkillOptions = card.skill.attribute as never;
	const facingIdentifiers = getFacingIdentifiers(
		duel,
		state.owner,
		state.id,
		attr.radius || 0,
	);

	if (facingIdentifiers.length === 0) return commands;

	facingIdentifiers.forEach((facingIdentifier) => {
		const facingState = getCardState(duel.stateMap, facingIdentifier.id);

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
					attack: facingState.attack + (attr.attack || 0),
					defense: facingState.defense + (attr.defense || 0),
					health: facingState.health + (attr.health || 0),
				},
			})
			.forEach(registerCommand);
	});

	return commands;
};
