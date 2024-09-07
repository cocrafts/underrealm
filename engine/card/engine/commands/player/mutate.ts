import type { CommandCreator, CommandRunner, DuelState } from '../../../types';
import { CommandType, DuelPlace } from '../../../types';
import {
	cloneDuelSource,
	createCommandResult,
	getPlayerOrder,
} from '../../util';

export const create: CommandCreator = ({ owner, from, target, payload }) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		owner,
		type: CommandType.PlayerMutate,
		from,
		target,
		payload,
	});

	return commands;
};

export const run: CommandRunner = ({ snapshot, command }) => {
	const { player } = snapshot;
	const { target, payload } = command;
	const order = getPlayerOrder(player, target.owner);
	const playerClone = cloneDuelSource(snapshot, DuelPlace.Player);
	const currentPlayer = playerClone.source[order];

	Object.keys(payload).forEach((key) => {
		const diff = payload[key] || 0;
		currentPlayer[key] = currentPlayer[key] + diff;
	});

	return {
		[playerClone.key]: playerClone.source as unknown,
	} as DuelState;
};

export const command = {
	create,
	run,
};

export default command;
