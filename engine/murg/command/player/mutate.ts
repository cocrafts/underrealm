import {
	clonePlayer,
	createCommandResult,
	createDuelFragment,
} from '../../utils/helper';
import type { CommandCreator, CommandRunner } from '../../utils/type';
import { DuelCommandType } from '../../utils/type';

export const create: CommandCreator<'target' | 'payload'> = ({
	target,
	payload,
}) => {
	const { commands, registerCommand } = createCommandResult();

	registerCommand({
		type: DuelCommandType.PlayerMutate,
		target,
		payload,
	});

	return commands;
};

export const run: CommandRunner = ({ duel, command: { target, payload } }) => {
	const fragment = createDuelFragment(duel);
	const playerClone = clonePlayer(duel, target.to.owner);

	Object.keys(payload).forEach((key) => {
		const value = payload[key];

		if (isNaN(value)) {
			playerClone.state[key] = value;
		} else {
			playerClone.state[key] = value || 0;
		}
	});

	fragment[playerClone.key] = playerClone.state;

	return fragment;
};

export const playerMutate = {
	create,
	run,
};

export default playerMutate;
