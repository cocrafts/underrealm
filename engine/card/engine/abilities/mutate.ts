import type { AbilityRunner, DuelCommand } from '../../types';
import { AbilityTargeting } from '../../types';
import mutateCommand from '../commands/card/mutate';

export const run: AbilityRunner = ({ snapshot, ability, from }) => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i) => commands.push(i);
	const { targeting, attributes = {} } = ability;

	if (targeting === AbilityTargeting.Self) {
		const payload = { ...attributes };

		mutateCommand
			.create({
				snapshot,
				from,
				target: from,
				payload,
			})
			.forEach(registerCommand);
	}

	return commands;
};

export default run;
