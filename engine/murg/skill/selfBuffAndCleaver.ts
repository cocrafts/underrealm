import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { createCommandResult } from '../utils/helper';
import type {
	Attribute,
	CleaverAttackEffect,
	SkillRunner,
} from '../utils/type';
import { EffectIds } from '../utils/type';

interface SkillOptions {
	life: number;
	buff: Attribute;
	cleaver: CleaverAttackEffect;
}

export const selfBuffAndCleaver: SkillRunner = ({
	duel,
	cardId,
	sourceType,
}) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const options: SkillOptions = card.skill.attribute as never;
	const state = getCardState(duel.stateMap, cardId);

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
					SelfBuff: {
						id: EffectIds.SelfBuff,
						life: options.life,
						attribute: options.buff,
					},
					CleaverAttack: {
						id: EffectIds.CleaverAttack,
						life: options.life,
						cleaverAttack: options.cleaver,
					},
				},
			},
		})
		.forEach(registerCommand);

	return commands;
};
