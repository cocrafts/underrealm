import type {
	CommandCreator,
	DuelCommand,
	DuelIdentifier,
} from '../../../../types';
import { DuelPlace } from '../../../../types';
import mutateCommand from '../../card/mutate';

import { activate } from './internal';

export const create: CommandCreator = (payload) => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i: DuelCommand) => commands.push(i);
	const { snapshot } = payload;
	const { player, ground, setting } = snapshot;
	const [firstPlayer, secondPlayer] = player;
	const [firstGround, secondGround] = ground;

	for (let i = 0; i < setting.groundSize; i += 1) {
		const firstCard = firstGround[i];
		const secondCard = secondGround[i];

		if (firstCard?.cooldown === 1) {
			const target: DuelIdentifier = {
				id: firstCard.id,
				owner: firstPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			activate(payload, target).forEach(registerCommand);
			mutateCommand
				.create({
					snapshot,
					target,
					payload: { cooldown: firstCard.base.cooldown },
				})
				.forEach(registerCommand);
		}

		if (secondCard?.cooldown === 1) {
			const target: DuelIdentifier = {
				id: secondCard.id,
				owner: secondPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			activate(payload, target).forEach(registerCommand);
			mutateCommand
				.create({
					snapshot,
					target,
					payload: { cooldown: secondCard.base.cooldown },
				})
				.forEach(registerCommand);
		}
	}

	return commands;
};

export const skillCommand = {
	create,
};

export default skillCommand;
