import { createCommand } from '../command';
import { getCardState } from '../utils/card';
import { getClosestEmpty } from '../utils/ground';
import { createCommandResult, selectGround } from '../utils/helper';
import type { SkillRunner } from '../utils/type';
import { CommandSourceType, DuelPlace } from '../utils/type';

export const createIllusion: SkillRunner = ({ duel, cardId, sourceType }) => {
	const { commands, registerCommand } = createCommandResult();
	const state = getCardState(duel.stateMap, cardId);
	const myGround = selectGround(duel, state.owner);
	const closestIndex = getClosestEmpty(myGround);
	const generatedId = `${cardId.substring(0, 9)}#${duel.uniqueCardCount + 1}`;

	createCommand
		.cardMove({
			owner: state.owner,
			target: {
				source: {
					type: sourceType,
					owner: state.owner,
					place: state.place,
					id: state.id,
				},
				from: {
					owner: state.owner,
					place: DuelPlace.Ability,
					id: generatedId,
				},
				to: {
					owner: state.owner,
					place: state.place,
					index: closestIndex,
				},
			},
		})
		.forEach(registerCommand);

	createCommand
		.cardMutate({
			owner: state.owner,
			target: {
				source: {
					type: CommandSourceType.System,
				},
				to: {
					owner: state.owner,
					place: state.place,
					id: generatedId,
				},
			},
			payload: {
				attack: 10,
				defense: 0,
				health: 10,
				effectMap: {
					Illusion: {
						id: 'Illusion',
					},
				},
			},
		})
		.forEach(registerCommand);

	return commands;
};
