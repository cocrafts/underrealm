import { createCommand, runCommand } from '../command';
import { getCardState } from '../utils/card';
import { createCommandResult } from '../utils/helper';
import {
	createAndMergeBundle,
	createCommandBundle,
	mergeFragmentToState,
	runAndMergeBundle,
} from '../utils/state';
import type { DuelCommandPayload, DuelState, MoveResult } from '../utils/type';
import {
	BundleGroup,
	CommandSourceType,
	DuelPhases,
	DuelPlace,
} from '../utils/type';

export const turnCleanUp = (duel: DuelState): MoveResult => {
	const { setting, firstMover, firstGround, secondGround } = duel;
	const unitCleanUpBundle = createCommandBundle(duel, BundleGroup.UnitCleanUp);

	const createAndMergeCardMutate = (cardId: string) => {
		if (!cardId) return;

		const { commands, registerCommand } = createCommandResult();
		const state = getCardState(duel.stateMap, cardId);

		if (state.charge > 0 && !state.effectMap.Illusion) {
			createCommand
				.cardMutate({
					owner: state.owner,
					target: {
						to: {
							owner: state.owner,
							id: state.id,
							place: state.place,
						},
					},
					payload: { charge: state.charge - 1 },
				})
				.forEach(registerCommand);
		}

		commands.forEach((command) => {
			unitCleanUpBundle.commands.push(command);
			mergeFragmentToState(duel, runCommand({ duel, command }));
		});
	};

	for (let i = 0; i < setting.groundSize; i++) {
		createAndMergeCardMutate(firstGround[i]);
		createAndMergeCardMutate(secondGround[i]);
	}

	const nextTurn = duel.turn + 1;

	const turnCleanUpBundle = createAndMergeBundle(
		duel,
		BundleGroup.TurnCleanUp,
		createCommand.duelMutate({
			payload: {
				turn: nextTurn,
				phase: DuelPhases.Draw,
				phaseOf: firstMover,
			},
		}),
	);

	const extendedSpellTurn = Math.floor(nextTurn / setting.spellIncreaseCycle);
	const playerUpdates: DuelCommandPayload = {
		perTurnHero: setting.perTurnHero,
		perTurnSpell: setting.perTurnSpell + extendedSpellTurn,
	};

	runAndMergeBundle(
		duel,
		turnCleanUpBundle,
		createCommand.playerMutate({
			target: {
				source: {
					type: CommandSourceType.System,
				},
				to: {
					owner: duel.firstPlayer.id,
					place: DuelPlace.Player,
				},
			},
			payload: playerUpdates,
		}),
	);

	runAndMergeBundle(
		duel,
		turnCleanUpBundle,
		createCommand.playerMutate({
			target: {
				source: {
					type: CommandSourceType.System,
				},
				to: {
					owner: duel.secondPlayer.id,
					place: DuelPlace.Player,
				},
			},
			payload: playerUpdates,
		}),
	);

	return {
		duel,
		commandBundles: [unitCleanUpBundle, turnCleanUpBundle],
	};
};
