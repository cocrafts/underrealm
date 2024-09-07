import { createCommand } from '../command';
import { skillMap } from '../skill';
import { getCard, getCardState } from '../utils/card';
import {
	createCommandBundle,
	emptyMoveResult,
	runAndMergeBundle,
	runAndMergeHooks,
} from '../utils/state';
import type {
	DuelCommandBundle,
	DuelCommandTarget,
	DuelState,
	MoveResult,
} from '../utils/type';
import { ActivationType, BundleGroup, CommandSourceType } from '../utils/type';

export const activateChargeSkill = (
	duel: DuelState,
	target: DuelCommandTarget,
): MoveResult => {
	const skillActivateBundle = createCommandBundle(
		duel,
		BundleGroup.SkillActivation,
	);
	const commandBundles: DuelCommandBundle[] = [skillActivateBundle];
	const cardId = target.from.id;
	const card = getCard(duel.cardMap, cardId);
	const state = getCardState(duel.stateMap, cardId);
	const isIllusion = !!state.effectMap.Illusion;
	const isChargeSkill = card?.skill?.activation === ActivationType.Charge;
	const isChargeValid = state.charge <= 0;

	if (!isChargeSkill || !isChargeValid || isIllusion) return emptyMoveResult;

	const skillFunc = skillMap[card.skill.attribute?.id];
	const skillCommands =
		skillFunc?.({
			duel,
			cardId,
			sourceType: CommandSourceType.ChargedSkill,
		}) || [];

	if (skillCommands.length > 0) {
		const hookBundle = createCommandBundle(duel, BundleGroup.SkillActivation);

		runAndMergeBundle(duel, skillActivateBundle, skillCommands);
		runAndMergeHooks(duel, hookBundle, skillCommands);

		if (hookBundle.commands.length > 0) {
			commandBundles.push(hookBundle);
		}
	}

	/* always reset Charge after skill activated, no matter it does something or not */
	runAndMergeBundle(
		duel,
		skillActivateBundle,
		createCommand.cardMutate({
			owner: state.owner,
			target: {
				source: {
					type: CommandSourceType.System,
				},
				to: target.from,
			},
			payload: { charge: card.skill.charge },
		}),
	);

	return { duel, commandBundles };
};
