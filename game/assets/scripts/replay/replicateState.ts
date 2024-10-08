import Engine from '@underrealm/murg';
import type { Node } from 'cc';
import { instantiate, Quat, Vec3 } from 'cc';

import { CardManager } from '../CardManager';
import { UnitManager } from '../UnitManager';
import { selectGroundGuide } from '../util/helper';
import { getGroundExpos, getPositionExpos } from '../util/layout';
import { system } from '../util/system';

const { selectHand, selectGround } = Engine;

export const replicateState = () => {
	const { globalNodes, playerIds } = system;
	replicateHandState({
		handGuide: globalNodes.playerHandGuide,
		parentNode: globalNodes.playerHand,
		playerId: playerIds.me,
		scaleFactor: 0.4,
		spacing: 80,
	});
	replicateHandState({
		handGuide: globalNodes.enemyHandGuide,
		parentNode: globalNodes.enemyHand,
		playerId: playerIds.enemy,
		scaleFactor: 0.28,
		spacing: 60,
	});

	replicateGroundState({
		playerId: system.playerIds.me,
		parentNode: system.globalNodes.playerGround,
	});
	replicateGroundState({
		playerId: system.playerIds.enemy,
		parentNode: system.globalNodes.enemyGround,
	});
};

const replicateHandState = ({
	parentNode,
	playerId,
	handGuide,
	scaleFactor,
	spacing,
}: {
	parentNode: Node;
	playerId: string;
	handGuide: Node;
	scaleFactor: number;
	spacing: number;
}) => {
	const hand = selectHand(system.duel, playerId);
	const handPositions = getPositionExpos(handGuide, hand.length, spacing);
	const isPlayerHand = playerId === system.playerIds.me;

	for (let i = 0; i < hand.length; i++) {
		const cardId = hand[i];
		const node = instantiate(system.globalNodes.cardTemplate);
		node.setPosition(handPositions[i]);
		node.setScale(new Vec3(scaleFactor, scaleFactor, 1));
		!isPlayerHand && node.setRotation(Quat.fromEuler(new Quat(), 0, 0, 180));
		node.getComponent(CardManager).setCardId(cardId);
		node.getChildByPath('back').active = !isPlayerHand;
		node.parent = parentNode;
		system.cardRefs[cardId] = node;
	}
};

const replicateGroundState = ({
	parentNode,
	playerId,
}: {
	parentNode: Node;
	playerId: string;
}) => {
	const groundGuide = selectGroundGuide(playerId);
	const groundPositions = getGroundExpos(groundGuide);
	const ground = selectGround(system.duel, playerId);

	for (let i = 0; i < ground.length; i++) {
		const cardId = ground[i];
		if (cardId) {
			const node = instantiate(system.globalNodes.unitTemplate);
			node.setPosition(groundPositions[i]);
			node.getComponent(UnitManager).setCardId(cardId);
			node.parent = parentNode;
			system.cardRefs[cardId] = node;
		}
	}
};
