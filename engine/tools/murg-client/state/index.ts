import type {
	DuelCommandBundle,
	DuelState,
	MoveResult,
} from '@underrealm/murg';
import {
	DuelPlace,
	getInitialState,
	mergeFragmentToState,
	move,
	runCommand,
} from '@underrealm/murg';
import clone from 'lodash/cloneDeep';

const cache = require('./cache.json');
import * as history from './commands';

const redistribute = false;
export const initialState = getInitialState(cache.config);

export const replay = () => {
	const duel: DuelState = clone(initialState);
	const commandHistory: DuelCommandBundle[] = [];

	const runMove = (move: MoveResult) => {
		const { duel: fragment, commandBundles } = move;

		if (fragment) mergeFragmentToState(duel, fragment);
		commandBundles.forEach((bundle) => commandHistory.push(bundle));
	};

	const runCommandBundles = (bundles: DuelCommandBundle[]) => {
		bundles.forEach((bundle) => {
			bundle.commands.forEach((command) => {
				mergeFragmentToState(duel, runCommand({ duel, command }));
			});

			commandHistory.push(bundle);
		});
	};

	if (redistribute) {
		runMove(move.distributeInitialCards(duel));
		runMove(move.distributeTurnCards(duel));
	} else {
		runCommandBundles(history.distributeInitialCards);
		/*
		 * Turn 1
		 * A
		 */
		runMove(move.distributeTurnCards(duel));
		runMove(
			move.summonCard(duel, {
				from: {
					owner: duel.firstPlayer.id,
					place: DuelPlace.Hand,
					id: duel.firstHand[1],
				},
				to: {
					owner: duel.firstPlayer.id,
					place: DuelPlace.Ground,
					index: 5,
				},
			}),
		);
		runMove(move.endTurn(duel));

		/*
		 * B
		 */
		runMove(move.distributeTurnCards(duel));
		runMove(
			move.summonCard(duel, {
				from: {
					owner: duel.secondPlayer.id,
					place: DuelPlace.Hand,
					id: duel.secondHand[0],
				},
				to: {
					owner: duel.secondPlayer.id,
					place: DuelPlace.Ground,
					index: 5,
				},
			}),
		);
		runMove(
			move.summonCard(duel, {
				from: {
					owner: duel.secondPlayer.id,
					place: DuelPlace.Hand,
					id: duel.secondHand[6],
				},
				to: {
					owner: duel.secondPlayer.id,
					place: DuelPlace.Ground,
					index: 4,
				},
			}),
		);
		runMove(move.endTurn(duel));

		/*
		 * Fight
		 */
		runMove(move.preFight(duel));
		runMove(move.fight(duel));
		runMove(move.postFight(duel));
		runMove(move.reinforce(duel));
		runMove(move.turnCleanUp(duel));

		/*
		 * Turn 2
		 * A
		 */
		runMove(move.distributeTurnCards(duel));
		runMove(
			move.summonCard(duel, {
				from: {
					owner: duel.firstPlayer.id,
					place: DuelPlace.Hand,
					id: duel.firstHand[0],
				},
				to: {
					owner: duel.firstPlayer.id,
					place: DuelPlace.Ground,
					index: 4,
				},
			}),
		);
		runMove(move.endTurn(duel));

		/*
		 * B
		 */
		runMove(move.distributeTurnCards(duel));
		runMove(move.endTurn(duel));

		/*
		 * Fight
		 */
		runMove(move.preFight(duel));
		runMove(move.fight(duel));
		runMove(move.postFight(duel));
		runMove(move.reinforce(duel));
		runMove(move.turnCleanUp(duel));
	}

	return {
		duel,
		history: commandHistory,
	};
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printMove = (move: MoveResult): void => {
	console.log(JSON.stringify(move.commandBundles, null, 2));
};
