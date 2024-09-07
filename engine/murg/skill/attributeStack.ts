import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { getFacingIdentifier } from '../utils/ground';
import { createCommandResult } from '../utils/helper';
import type { Attribute, SkillRunner } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'>;

export const attributeStack: SkillRunner = ({ duel, cardId, sourceType }) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const attr: SkillOptions = card.skill.attribute as never;
	const state = getCardState(duel.stateMap, cardId);
	const facingIdentifier = getFacingIdentifier(duel, state.owner, cardId);

	if (!facingIdentifier?.id) return commands;

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
					owner: state.owner,
					place: state.place,
					id: state.id,
				},
			},
			payload: {
				effectMap: {
					AttributeStack: {
						id: 'AttributeStack',
						attributeStack: {
							targetId: facingIdentifier.id,
							attribute: {
								attack: attr.attack || 0,
								defense: attr.defense || 0,
								health: attr.health || 0,
							},
						},
					},
				},
			},
		})
		.forEach(registerCommand);

	return commands;
};
