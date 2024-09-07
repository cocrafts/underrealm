import type {
	DuelCommandBundle,
	DuelState,
	MoveResult,
} from '@metacraft/murg-engine';
import {
	BundleGroup,
	getInitialState,
	getWinner,
	mergeFragmentToState,
	move,
	runCommand,
} from '@metacraft/murg-engine';

import type { CommandHandler } from '../util/type';
import { DuelCommands } from '../util/type';

import { fetchDuel } from './internal';

export const onIncomingBundle: CommandHandler<DuelCommandBundle[]> = async (
	{ duelId, send },
	incomingBundles,
) => {
	const duelRecord = fetchDuel(duelId);
	const { config, history } = duelRecord;
	const level = history.length;
	const duel = getInitialState(config);
	runBundles(duel, history);
	const autoBundles = fillAndRunBundles(duel, incomingBundles);
	const winner = getWinner(duel);

	autoBundles.forEach((bundle) => history.push(bundle));
	await send({ level, bundles: autoBundles });
	if (winner) {
		duelRecord.winner = winner;
		await send({ winner }, DuelCommands.GameOver);
	}

	try {
		require('fs').writeFileSync(
			'duel.json',
			JSON.stringify(duelRecord, null, 2),
		);
	} catch (e) {
		console.log(e);
	}
};

export const runBundles = (duel: DuelState, bundles: DuelCommandBundle[]) => {
	bundles.forEach((bundle) => {
		bundle.commands.forEach((command) => {
			mergeFragmentToState(duel, runCommand({ duel, command }));
		});
	});
};

export const fillAndRunBundles = (
	duel: DuelState,
	bundles: DuelCommandBundle[],
) => {
	const responseBundles: DuelCommandBundle[] = [];
	const registerBundle = (bundle: DuelCommandBundle) => {
		if (bundle.commands.length > 0) {
			responseBundles.push(bundle);
			bundle.commands.forEach((command) => {
				mergeFragmentToState(duel, runCommand({ duel, command }));
			});
		}
	};

	const injectMove = ({ duel: fragment, commandBundles }: MoveResult) => {
		if (commandBundles.length > 0 && fragment) {
			mergeFragmentToState(duel, fragment);
			commandBundles.forEach((bundle) => responseBundles.push(bundle));
		}
	};

	bundles.forEach((bundle) => {
		registerBundle(bundle);

		if (bundle.group === BundleGroup.Summon) {
			injectMove(move.reinforce(duel));
		} else if (bundle.group === BundleGroup.EndTurn) {
			if (bundle.phaseOf === duel.firstPlayer.id) {
				injectMove(move.distributeTurnCards(duel));
			} else {
				injectMove(move.preFight(duel));
				injectMove(move.reinforce(duel));
				injectMove(move.fight(duel));
				injectMove(move.reinforce(duel));
				injectMove(move.postFight(duel));
				injectMove(move.reinforce(duel));
				injectMove(move.turnCleanUp(duel));
				injectMove(move.distributeTurnCards(duel));
			}
		}
	});

	return responseBundles;
};
