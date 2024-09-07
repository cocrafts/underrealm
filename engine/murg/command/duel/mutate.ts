import { createCommandResult, createDuelFragment } from '../../utils/helper';
import type { CommandCreator, CommandRunner } from '../../utils/type';
import { DuelCommandType } from '../../utils/type';

export const create: CommandCreator<'payload'> = ({ payload }) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		type: DuelCommandType.DuelMutate,
		payload,
	});

	return commands;
};

export const run: CommandRunner = ({ duel, command: { payload } }) => {
	const fragment = createDuelFragment(duel);

	Object.keys(payload).forEach((key) => {
		const value = payload[key];

		if (isNaN(value)) {
			fragment[key] = value;
		} else {
			fragment[key] = value || 0;
		}
	});

	return fragment;
};

export const duelMutate = {
	create,
	run,
};

export default duelMutate;
