import type { CommandCreator, DuelCommand } from '../../../../types';
import { DuelPlace } from '../../../../types';

import { attack, combat } from './internal';

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

		if (firstCard && secondCard) {
			combat(payload, i).forEach(registerCommand);
		} else if (firstCard) {
			attack(payload, {
				id: firstCard.id,
				owner: firstPlayer.id,
				position: i,
				place: DuelPlace.Ground,
			}).forEach(registerCommand);
		} else if (secondCard) {
			attack(payload, {
				id: secondCard.id,
				owner: secondPlayer.id,
				position: i,
				place: DuelPlace.Ground,
			}).forEach(registerCommand);
		}
	}

	return commands;
};

export const combatCommand = {
	create,
};

export default combatCommand;
