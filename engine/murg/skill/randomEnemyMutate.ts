import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { createCommandResult, getEnemyId, selectGround } from '../utils/helper';
import { pickGroundUnits } from '../utils/skill';
import type { Attribute, SkillRunner } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'>;

export const randomEnemyMutate: SkillRunner = ({
	duel,
	cardId,
	sourceType,
}) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const { ...stats }: SkillOptions = card.skill.attribute as never;
	const state = getCardState(duel.stateMap, cardId);
	const enemyId = getEnemyId(duel, state.owner);
	const enemyGround = selectGround(duel, enemyId);
	const [randomEnemyCardId] = pickGroundUnits(enemyGround, 1);

	if (!randomEnemyCardId) return commands;

	const enemyState = getCardState(duel.stateMap, randomEnemyCardId);

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
					owner: enemyId,
					place: enemyState.place,
					id: enemyState.id,
				},
			},
			payload: {
				attack: enemyState.attack + (stats.attack || 0),
				defense: enemyState.defense + (stats.defense || 0),
				health: enemyState.health + (stats.health || 0),
			},
		})
		.forEach(registerCommand);

	return commands;
};
