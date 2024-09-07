import type { AbilityRunner, DuelCommand } from '../../types';

import { runAbility } from './ability';
import { runHook } from './hook';

export const run: AbilityRunner = (payload) => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i) => commands.push(i);

	runAbility(payload).forEach(registerCommand);
	runHook(payload).forEach(registerCommand);

	return commands;
};
