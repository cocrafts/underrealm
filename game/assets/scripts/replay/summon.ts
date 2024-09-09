import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import { instantiate } from 'cc';

import {
	animateEnemySummon,
	animateGlowOff,
	animatePlayerSummon,
} from '../tween';
import { UnitManager } from '../UnitManager';
import { selectGroundGuide } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

export const playSummon = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];

	for (let i = 0; i < commands.length; i += 1) {
		const { type, owner, target } = commands[i];
		const isMoveCommand = type === DuelCommandType.CardMove;

		if (isMoveCommand) {
			const cardId = target.from.id;
			const isMyCommand = owner === system.playerIds.me;
			const groundPositions = getGroundExpos(selectGroundGuide(owner));
			const targetPosition = groundPositions[target.to.index];
			const cardNode = system.cardRefs[cardId];
			const unitNode = instantiate(system.globalNodes.unitTemplate);

			unitNode.getComponent(UnitManager).setCardId(cardId);
			system.cardRefs[cardId] = unitNode;

			if (isMyCommand) {
				unitNode.parent = system.globalNodes.playerGround;
				animateGlowOff(cardNode);
				promises.push(animatePlayerSummon(cardNode, unitNode, targetPosition));
			} else {
				unitNode.parent = system.globalNodes.enemyGround;
				unitNode.getChildByPath('front').active = false;
				unitNode.getChildByPath('back').active = true;
				promises.push(animateEnemySummon(cardNode, unitNode, targetPosition));
				setTimeout(() => cardNode.destroy(), 0);
			}
		}
	}

	await Promise.all(promises);
};
