import type {
	DuelCommandBundle,
	DuelState,
	MoveResult,
} from '@underrealm/murg';
import {
	BundleGroup,
	getInitialState,
	getWinner,
	mergeFragmentToState,
	move,
	runCommand,
} from '@underrealm/murg';
import { GameMatch } from 'models/game';

import type { CommandHandler } from './types';
import { EventType } from './types';

export const onIncomingBundle: CommandHandler<DuelCommandBundle[]> = async (
	{ matchId, send },
	incomingBundles,
) => {
	const gameMatch = await GameMatch.findById(matchId);
	// important: must convert db object to JSON to be correctly handled by engine
	const { config, history } = gameMatch.toJSON();

	const level = history.length;
	const duel = getInitialState(config);

	runBundles(duel, history);
	const autoBundles = fillAndRunBundles(duel, incomingBundles);
	const winner = getWinner(duel);

	await send({ level, bundles: autoBundles });
	if (winner) await send({ winner }, EventType.GameOver);

	await GameMatch.updateOne(
		{ _id: matchId },
		{ $push: { history: { $each: autoBundles } }, $set: { winner } },
	);
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
		if (commandBundles.length > 0) {
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
