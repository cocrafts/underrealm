import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { CardManager } from '../CardManager';
import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween';
import { selectDeckNode } from '../util/helper';
import {
	getCenterExpos,
	getPositionExpos,
	getRightExpos,
} from '../util/layout';
import { system } from '../util/system';

const { selectHand } = Engine;

export const playDraw = async ({
	phaseOf,
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];
	const hand = selectHand(system.duel, phaseOf);
	const fromPosition = selectDeckNode(phaseOf).parent.getPosition();
	const isMyPhase = system.playerIds.me === phaseOf;
	const handPositions = isMyPhase
		? getPositionExpos(system.globalNodes.playerHandGuide, hand.length, 80)
		: getPositionExpos(system.globalNodes.enemyHandGuide, hand.length, 60);
	const expoCreator = commands.length > 3 ? getCenterExpos : getRightExpos;
	const expoPositions = expoCreator(commands.length);

	for (let i = 0; i < commands.length; i += 1) {
		const handIndex = hand.length - commands.length + i;
		const cardId = hand[handIndex];
		const handPosition = handPositions[handIndex];
		const expoPosition = expoPositions[i];
		const node = instantiate(system.globalNodes.cardTemplate);

		node.getComponent(CardManager).setCardId(cardId);
		system.cardRefs[cardId] = node;

		if (phaseOf === system.playerIds.me) {
			node.parent = system.globalNodes.playerHand;
			promises.push(
				animateDrawPlayerCard({
					node,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.2,
				}),
			);
		} else {
			node.parent = system.globalNodes.enemyHand;
			promises.push(
				animateDrawEnemyCard({
					node,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				}),
			);
		}
	}

	await Promise.all(promises);
};
