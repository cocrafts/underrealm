import { createCommand } from '../command';
import { getCard, getCardState } from '../utils/card';
import { createCommandResult, getEnemyId, selectPlayer } from '../utils/helper';
import type { Attribute, SkillRunner } from '../utils/type';
import { DuelPlace } from '../utils/type';

type SkillOptions = Omit<Attribute, 'charge'> & {
	isTargetEnemyPlayer: boolean;
};

export const playerMutate: SkillRunner = ({ duel, cardId, sourceType }) => {
	const { commands, registerCommand } = createCommandResult();
	const card = getCard(duel.cardMap, cardId);
	const state = getCardState(duel.stateMap, cardId);
	const attr: SkillOptions = card.skill.attribute as never;
	const targetPlayer = attr.isTargetEnemyPlayer
		? getEnemyId(duel, state.owner)
		: state.owner;
	const targetPlayerState = selectPlayer(duel, targetPlayer);

	createCommand
		.playerMutate({
			target: {
				source: {
					type: sourceType,
					owner: state.owner,
					place: state.place,
					id: state.id,
				},
				to: {
					owner: targetPlayer,
					place: DuelPlace.Player,
				},
			},
			payload: {
				health: targetPlayerState.health + attr.health || 0,
			},
		})
		.forEach(registerCommand);

	return commands;
};
