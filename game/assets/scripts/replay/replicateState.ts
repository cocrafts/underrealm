import Engine from '@underrealm/murg';
import { instantiate, Quat, Vec3 } from 'cc';

import { CardManager } from '../CardManager';
import { getPositionExpos } from '../util/layout';
import { system } from '../util/system';

const { selectHand } = Engine;

export const replicateState = () => {
	const myHand = selectHand(system.duel, system.playerIds.me);
	const myHandPositions = getPositionExpos(
		system.globalNodes.playerHandGuide,
		myHand.length,
		80,
	);
	replicateHandState(myHand, myHandPositions, true);
	const enemyHand = selectHand(system.duel, system.playerIds.enemy);
	const enemyHandPositions = getPositionExpos(
		system.globalNodes.enemyHandGuide,
		enemyHand.length,
		60,
	);
	replicateHandState(enemyHand, enemyHandPositions, false);
};

const replicateHandState = (
	hand: string[],
	handPositions: Vec3[],
	isPlayerHand,
) => {
	const scaleFactor = isPlayerHand ? 0.4 : 0.28;
	for (let i = 0; i < hand.length; i++) {
		const cardId = hand[i];
		const node = instantiate(system.globalNodes.cardTemplate);
		node.setPosition(handPositions[i]);
		node.setScale(new Vec3(scaleFactor, scaleFactor, 1));
		!isPlayerHand && node.setRotation(Quat.fromEuler(new Quat(), 0, 0, 180));
		node.getComponent(CardManager).setCardId(cardId);
		node.getChildByPath('back').active = !isPlayerHand;
		node.parent = isPlayerHand
			? system.globalNodes.playerHand
			: system.globalNodes.enemyHand;
		system.cardRefs[cardId] = node;
	}
};
