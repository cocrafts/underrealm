import { runCommand } from '../command';
import { skillMap } from '../skill';

import { getCard, getCardState } from './card';
import type {
	BundleGroup,
	DuelCommand,
	DuelCommandBundle,
	DuelState,
	MoveResult,
	SkillRunner,
} from './type';
import {
	ActivationType,
	CommandSourceType,
	DuelPlace,
	InspireSource,
} from './type';

/* This file is a collection of functions that uses to manage states
 * most of the functions are Impure that mutate params, be careful! */

export const mergeFragmentToState = (
	state: DuelState,
	{ stateMap, ...props }: Partial<DuelState>,
): void => {
	Object.keys(props).forEach((key) => {
		if (state[key] !== props[key]) {
			state[key] = props[key];
		}
	});

	if (stateMap) {
		Object.keys(stateMap).forEach((id) => {
			if (state.stateMap[id] !== stateMap[id]) {
				state.stateMap[id] = stateMap[id];
			}
		});
	}
};

export const createCommandBundle = (
	duel: DuelState,
	group: BundleGroup,
): DuelCommandBundle => {
	return {
		turn: duel.turn,
		group,
		phase: duel.phase,
		phaseOf: duel.phaseOf,
		commands: [],
	};
};

export const runAndMergeBundle = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	commands: DuelCommand[],
) => {
	commands.forEach((command) => {
		bundle.commands.push(command);
		mergeFragmentToState(duel, runCommand({ duel, command }));
	});

	return bundle;
};

export const createAndMergeBundle = (
	duel: DuelState,
	group: BundleGroup,
	commands: DuelCommand[],
) => {
	const bundle: DuelCommandBundle = {
		turn: duel.turn,
		group,
		phase: duel.phase,
		phaseOf: duel.phaseOf,
		commands: [],
	};

	return runAndMergeBundle(duel, bundle, commands);
};

export const emptyMoveResult: MoveResult = {
	commandBundles: [],
};

const skillInspires: CommandSourceType[] = [
	CommandSourceType.ChargedSkill,
	CommandSourceType.PreFightSkill,
	CommandSourceType.PostFightSkill,
];

export const runAndMergeHooks = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	recentCommands: DuelCommand[],
): DuelCommandBundle => {
	const deathCommands: DuelCommand[] = [];
	const summonCommands: DuelCommand[] = [];
	const skillCommands: DuelCommand[] = [];

	for (let i = 0; i < recentCommands.length; i += 1) {
		const command = recentCommands[i];
		const { target } = command;
		const fromHand = target?.from?.place === DuelPlace.Hand;
		const fromGround = target?.from?.place === DuelPlace.Ground;
		const toGrave = target?.to?.place === DuelPlace.Grave;
		const toGround = target?.to?.place === DuelPlace.Ground;
		const isDeath = fromGround && toGrave;
		const isSummon = fromHand && toGround;
		const isSourceBySkill = skillInspires.indexOf(target?.source?.type) >= 0;

		if (isDeath) {
			deathCommands.push(command);
		}

		if (isSummon) {
			summonCommands.push(command);
		}

		if (isSourceBySkill) {
			skillCommands.push(command);
		}
	}

	/* <- Summon hooks */
	summonCommands.forEach((command) => {
		const cardId = command.target.from.id;
		const card = getCard(duel.cardMap, cardId);
		const isSummonActivation = card.skill?.activation === ActivationType.Summon;
		const skillFunc = skillMap[card.skill?.attribute?.id];

		if (isSummonActivation && skillFunc) {
			const skillCommands = skillFunc({
				duel,
				cardId,
				sourceType: CommandSourceType.SummonSkill,
			});

			runAndMergeBundle(duel, bundle, skillCommands);

			if (skillCommands.length > 0) {
				runAndMergeHooks(duel, bundle, skillCommands);
			}
		}
	});

	/* <- Death hooks */
	deathCommands.forEach((command) => {
		const cardId = command.target.from.id;
		const card = getCard(duel.cardMap, cardId);
		const isDeathActivation = card.skill?.activation === ActivationType.Death;
		const skillFunc = skillMap[card.skill?.attribute?.id];

		if (isDeathActivation && skillFunc) {
			const skillCommands = skillFunc({
				duel,
				cardId,
				sourceType: CommandSourceType.SummonSkill,
			});

			runAndMergeBundle(duel, bundle, skillCommands);

			if (skillCommands.length > 0) {
				runAndMergeHooks(duel, bundle, skillCommands);
			}
		}
	});

	/* <-- Inspire hooks */
	for (let i = 0; i < duel.setting.groundSize; i += 1) {
		const firstCardId = duel.firstGround[i];
		const secondCardId = duel.secondGround[i];

		createAndMergeSkillInspire(duel, bundle, skillCommands, firstCardId);
		createAndMergeSkillInspire(duel, bundle, skillCommands, secondCardId);

		createAndMergeSummonInspire(duel, bundle, summonCommands, firstCardId);
		createAndMergeSummonInspire(duel, bundle, summonCommands, secondCardId);

		createAndMergeDeathInspire(duel, bundle, deathCommands, firstCardId);
		createAndMergeDeathInspire(duel, bundle, deathCommands, secondCardId);
	}

	return bundle;
};

const recursiveRunAndMergeInspiredCommands = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	inspiringCommands: DuelCommand[],
	skillFunc: SkillRunner,
	cardId: string,
) => {
	inspiringCommands.forEach(() => {
		const skillCommands = skillFunc({
			duel,
			cardId,
			sourceType: CommandSourceType.InspiredSkill,
		});

		runAndMergeBundle(duel, bundle, skillCommands);

		if (skillCommands.length > 0) {
			runAndMergeHooks(duel, bundle, skillCommands);
		}
	});
};

export const createAndMergeDeathInspire = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	deathCommands: DuelCommand[],
	cardId: string,
) => {
	if (!cardId) return;

	const card = getCard(duel.cardMap, cardId);
	const cardState = getCardState(duel.stateMap, cardId);
	const skill = card?.skill;
	const isIllusion = !!cardState.effectMap.Illusion;
	const isInspireDeath =
		skill?.activation === ActivationType.Inspire &&
		skill?.inspire === InspireSource.Death;
	const skillFunc = skillMap[skill.attribute?.id];

	if (isIllusion || !isInspireDeath || !skillFunc) return;

	recursiveRunAndMergeInspiredCommands(
		duel,
		bundle,
		deathCommands,
		skillFunc,
		cardId,
	);
};

export const createAndMergeSummonInspire = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	summonCommands: DuelCommand[],
	cardId: string,
) => {
	if (!cardId) return;

	const card = getCard(duel.cardMap, cardId);
	const cardState = getCardState(duel.stateMap, cardId);
	const skill = card?.skill;
	const isIllusion = !!cardState.effectMap.Illusion;
	const isInspireSummon =
		skill?.activation === ActivationType.Inspire &&
		skill?.inspire === InspireSource.Summon;
	const skillFunc = skillMap[skill.attribute?.id];

	if (isIllusion || !isInspireSummon || !skillFunc) return;

	recursiveRunAndMergeInspiredCommands(
		duel,
		bundle,
		summonCommands,
		skillFunc,
		cardId,
	);
};

export const createAndMergeSkillInspire = (
	duel: DuelState,
	bundle: DuelCommandBundle,
	skillCommands: DuelCommand[],
	cardId: string,
) => {
	if (!cardId) return;

	const card = getCard(duel.cardMap, cardId);
	const cardState = getCardState(duel.stateMap, cardId);
	const skill = card?.skill;
	const isIllusion = !!cardState.effectMap.Illusion;
	const isInspire = skill?.activation === ActivationType.Inspire;
	const isSkillInspire = skill?.inspire === InspireSource.Skill;
	const skillFunc = skillMap[skill.attribute?.id];

	if (isIllusion || !isInspire || !skillFunc) return;

	skillCommands.forEach((command) => {
		const fromCardId = command.target?.source?.id;
		const fromCard = getCard(duel.cardMap, fromCardId);
		const isElementalInspire = fromCard?.elemental === (skill.inspire as never);
		const isInspired = isSkillInspire || isElementalInspire;

		if (!isInspired) return;

		const innerSkillCommands =
			skillFunc?.({
				duel,
				cardId,
				sourceType: CommandSourceType.InspiredSkill,
			}) || [];

		runAndMergeBundle(duel, bundle, innerSkillCommands);

		if (innerSkillCommands.length > 0) {
			runAndMergeHooks(duel, bundle, innerSkillCommands);
		}
	});
};

export const getWinner = ({
	stateMap,
	firstPlayer,
	secondPlayer,
	firstGround,
	secondGround,
}: DuelState) => {
	if (firstPlayer.health <= 0 || secondPlayer.health <= 0) {
		if (firstPlayer.health === secondPlayer.health) {
			const extractPower = (ground: string[]) =>
				ground.reduce((sum, cardId) => {
					if (!cardId) return sum;
					const state = getCardState(stateMap, cardId);
					return sum + state.health + state.defense + state.attack;
				}, 0);
			const firstPower = extractPower(firstGround);
			const secondPower = extractPower(secondGround);

			return firstPower > secondPower ? firstPlayer.id : secondPlayer.id;
		}

		return firstPlayer.health > secondPlayer.health
			? firstPlayer.id
			: secondPlayer.id;
	}
};
