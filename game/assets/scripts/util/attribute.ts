import Engine from '@metacraft/murg-engine';
import { Label } from 'cc';

import { getPositiveColor } from '../util/helper';

import { system } from './system';

const {
	getCard,
	getCardState,
	getFacingIdentifier,
	getEnemyId,
	selectPlayer,
	selectGround,
	getComputedAttribute,
} = Engine;

export const updateGroundUnits = (): void => {
	system.duel.firstGround.forEach(updateUnit);
	system.duel.secondGround.forEach(updateUnit);
};

export const updateUnit = async (cardId: string): Promise<void> => {
	const node = system.cardRefs[cardId];

	if (!node) return;

	const card = getCard(system.duel.cardMap, cardId);
	const origin = card.attribute;
	const state = getCardState(system.duel.stateMap, cardId);
	const current = getComputedAttribute(system.duel, cardId);
	const future = getComputedAttribute(system.predict, cardId);
	const facingIdentifier = getFacingIdentifier(
		system.duel,
		state.owner,
		state.id,
	);
	const healthNode = node.getChildByPath('front/health');
	const healthLabel = healthNode.getComponent(Label);
	const defenseNode = node.getChildByPath('front/defense');
	const defenseLabel = defenseNode.getComponent(Label);
	const attackNode = node.getChildByPath('front/attack');
	const attackLabel = attackNode.getComponent(Label);
	const chargeLabel = node
		.getChildByPath('front/charge/value')
		.getComponent(Label);
	const deathPredictNode = node.getChildByPath('front/death');
	const healthPredictNode = node.getChildByPath('prediction/health');
	const healthPredictLabel = healthPredictNode.getComponent(Label);
	const defensePredictNode = node.getChildByPath('prediction/defense');
	const defensePredictLabel = defensePredictNode.getComponent(Label);
	const attackPredictNode = node.getChildByPath('prediction/attack');
	const attackPredictLabel = attackPredictNode.getComponent(Label);

	healthLabel.string = String(current.health);
	healthLabel.color = getPositiveColor(current.health, origin.health);
	defenseLabel.string = String(current.defense);
	defenseLabel.color = getPositiveColor(current.defense, origin.defense);
	attackLabel.string = String(current.attack);
	attackLabel.color = getPositiveColor(current.attack, origin.attack);

	if (current.charge !== undefined) {
		chargeLabel.string = String(current.charge);
	}

	defensePredictNode.active = false;
	defensePredictNode.active = false;
	healthPredictNode.active = false;
	defensePredictNode.active = false;
	attackPredictNode.active = false;
	deathPredictNode.active = false;

	const facingNode = system.cardRefs[facingIdentifier?.id];
	const nodeHided = node.getChildByPath('back')?.active;
	const facingHided = facingNode?.getChildByPath('back')?.active;

	if (!facingNode || nodeHided || facingHided) return;

	const healthDiff = future.health - current.health;
	const defenseDiff = future.defense - current.defense;
	const attackDiff = future.attack - current.attack;

	if (future.health <= 0) {
		deathPredictNode.active = true;
	}

	if (healthDiff === 0) {
		healthPredictNode.active = false;
	} else {
		healthPredictNode.active = true;
		healthPredictLabel.string = String(healthDiff);
		healthPredictLabel.color = getPositiveColor(healthDiff);
	}

	if (defenseDiff === 0) {
		defensePredictNode.active = false;
	} else {
		defensePredictNode.active = true;
		defensePredictLabel.string = String(defenseDiff);
		defensePredictLabel.color = getPositiveColor(defenseDiff);
	}

	if (attackDiff === 0) {
		attackPredictNode.active = false;
	} else {
		attackPredictNode.active = true;
		attackPredictLabel.string = String(attackDiff);
		attackPredictLabel.color = getPositiveColor(attackDiff);
	}
};

export const updatePlayers = async (): Promise<void> => {
	const promises = [
		updatePlayer(system.duel.firstPlayer.id),
		updatePlayer(system.duel.secondPlayer.id),
	];

	await Promise.all(promises);
};

export const updatePlayer = async (id: string): Promise<void> => {
	const player = selectPlayer(system.duel, id);
	const enemyId = getEnemyId(system.duel, id);
	const ground = selectGround(system.duel, id);
	const enemyGround = selectGround(system.duel, enemyId);
	const isMe = player.id === system.playerIds.me;
	const healthNode = isMe
		? system.globalNodes.playerHealth
		: system.globalNodes.enemyHealth;
	const predictNode = isMe
		? system.globalNodes.playerHealthPredict
		: system.globalNodes.enemyHealthPredict;
	const healthLabel = healthNode.getComponent(Label);
	const predictLabel = predictNode.getComponent(Label);
	let healthDiff = 0;

	for (let i = 0; i < enemyGround.length; i += 1) {
		const isPlayerAttack = enemyGround[i] && !ground[i];
		const enemyNode = system.cardRefs[enemyGround[i]];

		if (isPlayerAttack && !enemyNode?.getChildByPath('back')?.active) {
			const attribute = getComputedAttribute(system.duel, enemyGround[i]);
			healthDiff -= attribute.attack;
		}
	}

	healthLabel.string = String(player.health);
	predictLabel.string = String(healthDiff);
	predictNode.active = healthDiff !== 0;
};
