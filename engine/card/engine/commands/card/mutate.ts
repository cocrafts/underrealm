import type { CommandCreator, CommandRunner, DuelState } from '../../../types';
import { CommandType } from '../../../types';
import {
	cloneDuelSource,
	createCommandResult,
	getPlayerOrder,
} from '../../util';

export const create: CommandCreator = ({ owner, from, target, payload }) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		owner,
		type: CommandType.CardMutate,
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
	const targetClone = cloneDuelSource(snapshot, target.place);
	const currentTarget = targetClone.source[order];
	const targetInstance = currentTarget[target.position];
	if (targetInstance?.id !== target.id) return {} as DuelState;

	Object.keys(payload).forEach((key) => {
		const diff = payload[key] || 0;
		targetInstance[key] = targetInstance[key] + diff;
	});

	return {
		[targetClone.key]: targetClone.source as unknown,
	} as DuelState;
};

export const command = {
	create,
	run,
};

export default command;
