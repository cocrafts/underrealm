import { createCommand } from '../command';
import { getEnemyId } from '../utils/helper';
import { createCommandBundle, runAndMergeBundle } from '../utils/state';
import type { DuelState, MoveResult } from '../utils/type';
import { BundleGroup, DuelPhases } from '../utils/type';

export const endTurn = (duel: DuelState): MoveResult => {
	const endTurnBundle = createCommandBundle(duel, BundleGroup.EndTurn);
	const nextPlayerId = getEnemyId(duel, duel.phaseOf);

	runAndMergeBundle(
		duel,
		endTurnBundle,
		createCommand.duelMutate({
			payload: {
				phase:
					duel.phaseOf === duel.firstMover
						? DuelPhases.Draw
						: DuelPhases.PreFight,
				phaseOf: nextPlayerId,
			},
		}),
	);

	return {
		duel,
		commandBundles: [endTurnBundle],
	};
};
