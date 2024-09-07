import type { DuelState, RunCommandPayload } from '../../types';
import { CommandType } from '../../types';

import combatCommand from './board/combat';
import endCommand from './board/end';
import reinforceCommand from './board/reinforce';
import skillCommand from './board/skill';
import cardDrawCommand from './card/draw';
import cardMoveCommand from './card/move';
import cardMutateCommand from './card/mutate';
import duelMutateCommand from './duel/mutate';
import playerMutateCommand from './player/mutate';

export const commandCreators = {
	duelMutate: duelMutateCommand.create,
	playerMutate: playerMutateCommand.create,

	cardDraw: cardDrawCommand.create,
	cardMove: cardMoveCommand.create,
	cardMutate: cardMutateCommand.create,

	boardCombat: combatCommand.create,
	boardSkill: skillCommand.create,
	boardReinforce: reinforceCommand.create,
	boardEnd: endCommand.create,
};

export const runCommand = (payload: RunCommandPayload): DuelState => {
	const { command, snapshot } = payload;

	switch (command.type) {
		case CommandType.CardMutate:
			return cardMutateCommand.run(payload);
		case CommandType.CardMove:
			return cardMoveCommand.run(payload);
		case CommandType.PlayerMutate:
			return playerMutateCommand.run(payload);
		case CommandType.DuelMutate:
			return duelMutateCommand.run(payload);
		default:
			return snapshot;
	}
};
