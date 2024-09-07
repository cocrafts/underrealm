import { createCommand } from '../command';
import { troopId } from '../utils/card';
import {
	createCommandResult,
	pickUniqueIds,
	selectDeck,
	selectHand,
	selectPlayer,
} from '../utils/helper';
import {
	createAndMergeBundle,
	createCommandBundle,
	emptyMoveResult,
	runAndMergeBundle,
} from '../utils/state';
import type { DuelState, MoveResult } from '../utils/type';
import { BundleGroup, DuelPhases, DuelPlace } from '../utils/type';

export const distributeInitialCards = (duel: DuelState): MoveResult => {
	if (duel.turn > 0) return emptyMoveResult;

	const { setting, firstPlayer, secondPlayer } = duel;
	const firstDeck = selectDeck(duel, firstPlayer.id);
	const secondDeck = selectDeck(duel, secondPlayer.id);
	const firstPicks = pickUniqueIds(firstDeck, setting.initialCardCount);
	const secondPicks = pickUniqueIds(secondDeck, setting.initialCardCount);

	const createDistributeCommands = (owner, picks: string[]) => {
		const { commands, registerCommand } = createCommandResult();

		for (let i = 0; i < picks.length; i += 1) {
			createCommand
				.cardMove({
					owner,
					target: {
						from: {
							owner,
							id: picks[i],
							place: DuelPlace.Deck,
						},
						to: {
							owner,
							place: DuelPlace.Hand,
						},
					},
				})
				.forEach(registerCommand);
		}

		return commands;
	};

	const firstDrawBundle = createAndMergeBundle(
		duel,
		BundleGroup.InitialDraw,
		createDistributeCommands(firstPlayer.id, firstPicks),
	);

	const phaseUpdateBundle = createAndMergeBundle(
		duel,
		BundleGroup.PhaseUpdate,
		createCommand.duelMutate({ payload: { phaseOf: secondPlayer.id } }),
	);

	const secondDrawBundle = createAndMergeBundle(
		duel,
		BundleGroup.InitialDraw,
		createDistributeCommands(secondPlayer.id, secondPicks),
	);

	const cleanUpBundle = createAndMergeBundle(
		duel,
		BundleGroup.DuelUpdate,
		createCommand.duelMutate({
			payload: {
				phaseOf: firstPlayer.id,
				turn: duel.turn + 1,
			},
		}),
	);

	return {
		duel,
		commandBundles: [
			firstDrawBundle,
			phaseUpdateBundle,
			secondDrawBundle,
			cleanUpBundle,
		],
	};
};

export const distributeTurnCards = (duel: DuelState): MoveResult => {
	if (duel.phase !== DuelPhases.Draw) return emptyMoveResult;

	const player = selectPlayer(duel, duel.phaseOf);
	const deck = selectDeck(duel, duel.phaseOf);
	const hand = selectHand(duel, duel.phaseOf);
	const holdingTroopCount = hand.filter((id) => id.startsWith(troopId)).length;
	const deckDrawAmount = Math.min(deck.length, player.perTurnDraw);
	const troopDrawAmount = player.perTurnTroop - holdingTroopCount;
	const cardPicks = pickUniqueIds(deck, deckDrawAmount);
	const turnDrawBundle = createCommandBundle(duel, BundleGroup.TurnDraw);

	/* <-- Draw cards, does not exceed number of available card in Deck */
	for (let i = 0; i < deckDrawAmount; i += 1) {
		runAndMergeBundle(
			duel,
			turnDrawBundle,
			createCommand.cardMove({
				owner: player.id,
				target: {
					from: {
						owner: player.id,
						id: cardPicks[i],
						place: DuelPlace.Deck,
					},
					to: {
						owner: player.id,
						place: DuelPlace.Hand,
					},
				},
			}),
		);
	}

	/* <-- Draw troops, total amount of troop in Hand should be less than perTurnTroop */
	for (let i = 0; i < troopDrawAmount; i++) {
		runAndMergeBundle(
			duel,
			turnDrawBundle,
			createCommand.cardMove({
				owner: player.id,
				target: {
					from: {
						owner: player.id,
						id: troopId,
						place: DuelPlace.Player,
					},
					to: {
						owner: player.id,
						place: DuelPlace.Hand,
					},
				},
			}),
		);
	}

	const phaseUpdateBundle = createAndMergeBundle(
		duel,
		BundleGroup.PhaseUpdate,
		createCommand.duelMutate({
			payload: { phase: DuelPhases.Setup },
		}),
	);

	return {
		duel,
		commandBundles: [turnDrawBundle, phaseUpdateBundle],
	};
};
