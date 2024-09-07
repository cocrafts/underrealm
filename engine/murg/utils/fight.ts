import { createCommand } from '../command';
import { passiveMap } from '../passive';
import { skillMap } from '../skill';

import { getCard, getCardState } from './card';
import { emptyPassive, getEnemyId, selectPlayer } from './helper';
import { runAndMergeBundle } from './state';
import type {
	Attribute,
	Card,
	CardState,
	DuelCommandBundle,
	DuelState,
	PassivePair,
} from './type';
import {
	ActivationType,
	CommandSourceType,
	DuelPlace,
	ElementalType,
} from './type';

const generativeCycle: ElementalType[] = [
	ElementalType.Metal,
	ElementalType.Water,
	ElementalType.Wood,
	ElementalType.Fire,
	ElementalType.Earth,
];

const destructiveCycle: ElementalType[] = [
	ElementalType.Metal,
	ElementalType.Wood,
	ElementalType.Earth,
	ElementalType.Water,
	ElementalType.Fire,
];

export const runPlayerAttack = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	cardId: string,
): void => {
	const card = getCard(duel.cardMap, cardId);
	const isGloryActivation = card?.skill?.activation === ActivationType.Glory;
	const cardState = getCardState(duel.stateMap, cardId);
	const isIllusion = !!cardState.effectMap?.Illusion;
	const [cardPassive] = extractPassivePair(duel, cardId, null);
	const combinedState = combineAttribute(cardState, cardPassive);
	const opponentId = getEnemyId(duel, cardState.owner);
	const opponentState = selectPlayer(duel, opponentId);

	runAndMergeBundle(
		duel,
		bundle,
		createCommand.playerMutate({
			target: {
				source: {
					type: CommandSourceType.Unit,
					owner: cardState.owner,
					place: cardState.place,
					id: cardState.id,
				},
				to: {
					owner: opponentId,
					place: DuelPlace.Player,
				},
			},
			payload: { health: opponentState.health - combinedState.attack },
		}),
	);

	if (isGloryActivation && !isIllusion) {
		const skillFunc = skillMap[card.skill?.attribute?.id];
		const skillCommands = skillFunc?.({
			duel,
			cardId,
			sourceType: CommandSourceType.GlorySkill,
		});

		runAndMergeBundle(duel, bundle, skillCommands);
	}
};

export const runFightAt = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	i: number,
): DuelCommandBundle => {
	const { firstGround, secondGround } = duel;
	const firstId = firstGround[i];
	const secondId = secondGround[i];

	if (firstId && secondId) {
		runCardAttack(duel, bundle, firstId, secondId);
		runCardAttack(duel, bundle, secondId, firstId);
	} else if (firstId && !secondId) {
		runPlayerAttack(duel, bundle, firstId);
	} else if (!firstId && secondId) {
		runPlayerAttack(duel, bundle, secondId);
	}

	return bundle;
};

/* first Card getting attack from Second card, extract state after being attack
 * and generate corresponding Move */
export const runCardAttack = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	firstId: string,
	secondId: string,
): void => {
	const firstCard = getCard(duel.cardMap, firstId);
	const firstState = getCardState(duel.stateMap, firstId);
	const secondCard = getCard(duel.cardMap, secondId);
	const secondState = getCardState(duel.stateMap, secondId);
	const isAttackActivation =
		firstCard?.skill?.activation === ActivationType.Attack;
	const isDefenseActivation =
		secondCard?.skill?.activation === ActivationType.Defense;

	if (isAttackActivation && !firstState.effectMap.Illusion) {
		const skillFunc = skillMap[firstCard.skill?.attribute?.id];
		const skillCommands =
			skillFunc?.({
				duel,
				cardId: firstId,
				sourceType: CommandSourceType.AttackSkill,
			}) || [];

		runAndMergeBundle(duel, bundle, skillCommands);
	}

	if (isDefenseActivation && !secondState.effectMap.Illusion) {
		const skillFunc = skillMap[secondCard.skill?.attribute?.id];
		const skillCommands =
			skillFunc?.({
				duel,
				cardId: secondId,
				sourceType: CommandSourceType.DefenseSkill,
			}) || [];

		runAndMergeBundle(duel, bundle, skillCommands);
	}

	if (secondId) {
		const state = getStateAfterCombat(duel, secondId, firstId);

		runAndMergeBundle(
			duel,
			bundle,
			createCommand.cardMutate({
				owner: state.owner,
				target: {
					source: {
						type: CommandSourceType.Unit,
						owner: firstState.owner,
						place: firstState.place,
						id: firstState.id,
					},
					to: {
						owner: state.owner,
						place: state.place,
						id: state.id,
					},
				},
				payload: { health: state.health },
			}),
		);
	}
};

export const getStateAfterCombat = (
	duel: DuelState,
	firstId: string,
	secondId: string,
): CardState => {
	const passivePair = extractPassivePair(duel, firstId, secondId);
	const firstCard = getCard(duel.cardMap, firstId);
	const secondCard = getCard(duel.cardMap, secondId);
	const firstState = getCardState(duel.stateMap, firstId);
	const secondState = getCardState(duel.stateMap, secondId);
	const isAttackerCounter = isDestructive(secondCard, firstCard);
	const isAttackerCountered = isDestructive(firstCard, secondCard);
	const firstCombine = combineAttribute(passivePair[0], firstState);
	const secondCombine = combineAttribute(passivePair[1], secondState);
	const enhancedDamage = getGenerativeDamage(
		secondCombine.attack,
		isAttackerCounter,
		isAttackerCountered,
		duel.setting.elementalFactor,
	);
	const damageAfterDefense = Math.max(0, enhancedDamage - firstCombine.defense);

	return {
		...firstState,
		health: firstState.health - damageAfterDefense,
	};
};

export const isGenerative = (from: Card, to: Card) => {
	const fromIndex = generativeCycle.indexOf(from.elemental);
	return generativeCycle[fromIndex + 1] === to.elemental;
};

export const superiorElements = [ElementalType.Light, ElementalType.Dark];

export const isDestructive = (from: Card, to: Card) => {
	const isSuperior = superiorElements.indexOf(from.elemental) >= 0;
	const isAgainstSuperior = superiorElements.indexOf(to.elemental) >= 0;
	const isBare = !from.elemental;
	const isAgainstBare = !to.elemental;

	if (isAgainstSuperior) return false;
	if (isSuperior) return true;
	if (isBare || isAgainstBare) return false;

	const fromIndex = destructiveCycle.indexOf(from.elemental);

	if (fromIndex >= 0) {
		return destructiveCycle[fromIndex + 1] === to.elemental;
	}

	return false;
};

export const getGenerativeDamage = (
	damage: number,
	isCounter: boolean,
	isCountered: boolean,
	factor: number,
): number => {
	if (isCounter) {
		return Math.round(damage * (1 + factor));
	} else if (isCountered) {
		return Math.round(damage * (1 - factor));
	} else {
		return Math.round(damage);
	}
};

const emptyPassiveFunc = (): PassivePair => [emptyPassive, emptyPassive];

export const extractPassivePair = (
	duel: DuelState,
	firstCardId: string,
	secondCardId?: string,
): PassivePair => {
	if (!firstCardId) return [emptyPassive, emptyPassive];

	const firstCard = getCard(duel.cardMap, firstCardId);
	const firstPassiveId = firstCard?.skill?.passiveAttribute?.id;
	const firstPassiveFunc = passiveMap[firstPassiveId] || emptyPassiveFunc;
	const secondCard = getCard(duel.cardMap, secondCardId);
	const secondPassiveId = secondCard?.skill?.passiveAttribute?.id;
	const secondPassiveFunc = passiveMap[secondPassiveId] || emptyPassiveFunc;

	return crossCombinePassivePair(
		firstPassiveFunc({ duel, cardId: firstCardId }),
		secondPassiveFunc({ duel, cardId: secondCardId }),
	);
};

export const crossCombinePassivePair = (
	firstPair: PassivePair,
	secondPair: PassivePair,
): PassivePair => {
	return [
		{
			attack: firstPair[0].attack + secondPair[1].attack,
			defense: firstPair[0].defense + secondPair[1].defense,
			health: firstPair[0].health + secondPair[1].health,
		},
		{
			attack: firstPair[1].attack + secondPair[0].attack,
			defense: firstPair[1].defense + secondPair[0].defense,
			health: firstPair[1].health + secondPair[0].health,
		},
	];
};

export const combineAttribute = (
	first: Attribute,
	second: Attribute,
): Attribute => {
	return {
		attack: first.attack + (second?.attack || 0),
		defense: Math.max(0, first.defense + (second?.defense || 0)),
		health: first.health + (second?.health || 0),
		charge: first.charge + (second?.charge || 0),
	};
};
