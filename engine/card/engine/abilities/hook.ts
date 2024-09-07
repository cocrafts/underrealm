import type { AbilityRunner, DuelCommand, DuelIdentifier } from '../../types';
import { DuelPlace, HookType } from '../../types';

import { runAbility } from './ability';

export const runHook: AbilityRunner = ({ snapshot }) => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i) => commands.push(i);
	const { player, ground } = snapshot;
	const [firstPlayer, secondPlayer] = player;
	const [firstGround, secondGround] = ground;

	for (let i = 0; i < firstGround.length; i += 1) {
		const firstCard = firstGround[i];
		const secondCard = secondGround[i];

		if (firstCard?.base?.ability?.hook === HookType.SkillActivated) {
			const target: DuelIdentifier = {
				id: firstCard.id,
				owner: firstPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			runAbility({
				snapshot,
				ability: firstCard.base.ability,
				from: target,
				target,
			}).forEach(registerCommand);
		}

		if (secondCard?.base?.ability?.hook === HookType.SkillActivated) {
			const target: DuelIdentifier = {
				id: secondCard.id,
				owner: secondPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			runAbility({
				snapshot,
				ability: secondCard.base.ability,
				from: target,
				target,
			}).forEach(registerCommand);
		}
	}

	return commands;
};
