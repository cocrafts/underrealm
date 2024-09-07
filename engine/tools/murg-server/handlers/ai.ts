import type { DuelCommandBundle, DuelState } from '@underrealm/murg';
import { mergeFragmentToState, runCommand } from '@underrealm/murg';
import { getInitialState } from '@underrealm/murg';

import { fetchDuel } from './internal';
import { selectBestMove } from './selectedBestMove';

export const isHumanTurnEnded = (incomingBundles: DuelCommandBundle[]) => {
	const firstBundle = incomingBundles[0];
	return firstBundle?.group === 'EndTurn' && firstBundle?.phaseOf === 'A';
};

export const injectBotMove = (duelId, incomingBundles) => {
	if (isHumanTurnEnded(incomingBundles)) {
		const duelRecord = fetchDuel(duelId);
		const { config, history } = duelRecord;
		const duel = getInitialState(config);
		runBundles(duel, history);
		const botBundle = selectBestMove(duel, 1);
		return botBundle;
	}
	return undefined;
};

export const runBundles = (duel: DuelState, bundles: DuelCommandBundle[]) => {
	bundles.forEach((bundle) => {
		bundle.commands.forEach((command) => {
			mergeFragmentToState(duel, runCommand({ duel, command }));
		});
	});
};
