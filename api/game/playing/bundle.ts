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
import type { IGameDuel } from 'models/game';
import { GameDuel } from 'models/game';
import { safeAddGamePoints } from 'models/points';

import type { CommandHandler, ResponseSender } from './types';
import { EventType } from './types';

export const onIncomingBundle: CommandHandler<DuelCommandBundle[]> = async (
	{ duelId, send },
	incomingBundles,
) => {
	const duel = await GameDuel.findById(duelId);
	// important: must convert db object to JSON to be correctly handled by engine
	const { config, history } = duel.toJSON();

	const level = history.length;
	const duelState = getInitialState(config);
	runBundles(duelState, history);
	const autoBundles = fillAndRunBundles(duelState, incomingBundles);
	await send({ level, bundles: autoBundles });

	const winner = getWinner(duelState);
	if (winner) sendGameOver(duel, winner, send);

	await GameDuel.updateOne(
		{ _id: duelId },
		{ $push: { history: { $each: autoBundles } }, $set: { winner } },
	);
};

const sendGameOver = async (
	duel: IGameDuel,
	winner: string,
	send: ResponseSender,
) => {
	const loser =
		duel.config.firstPlayer.id === winner
			? duel.config.secondPlayer.id
			: duel.config.firstPlayer.id;

	const [winnerPoints, loserPoints] = await Promise.all([
		safeAddGamePoints(winner, duel.id, true),
		safeAddGamePoints(loser, duel.id, false),
	]);

	await send({ winner, winnerPoints, loserPoints }, EventType.GameOver);
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
