import type { CommandCreator, CommandRunner, DuelState } from '../../../types';
import { CommandType } from '../../../types';
import { createCommandResult } from '../../util';

export const create: CommandCreator = ({ payload }) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		type: CommandType.DuelMutate,
		payload,
	});

	return commands;
};

export const run: CommandRunner = ({ snapshot, command }) => {
	const { game } = snapshot;
	const gameClone = { ...game };
	const { payload } = command;

	Object.keys(payload).forEach((key) => {
		const diff = payload[key] || 0;
		gameClone[key] = gameClone[key] + diff;
	});

	return {
		game: gameClone,
	} as DuelState;
};

export const command = {
	create,
	run,
};

export default command;
