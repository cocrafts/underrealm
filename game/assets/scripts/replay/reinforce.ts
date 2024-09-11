import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';

import { animateRelocate } from '../tween';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

export const playReinforce = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const relocatePromises = [];
	const moveCommands = commands.filter(
		(i) => i.type === DuelCommandType.CardMove,
	);

	moveCommands
		.filter((i) => i.type === DuelCommandType.CardMove)
		.forEach(({ owner, target }) => {
			const cardNode = system.cardRefs[target?.from?.id];

			if (cardNode) {
				const isMyCommand = system.playerIds.me === owner;
				const expoNode = isMyCommand
					? system.globalNodes.playerGroundGuide
					: system.globalNodes.enemyGroundGuide;
				const expos = getGroundExpos(expoNode);

				relocatePromises.push(
					animateRelocate(cardNode, expos[target.to.index]),
				);
			}
		});

	await Promise.all(relocatePromises);
};
