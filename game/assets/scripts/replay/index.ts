import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import lodash from 'lodash';

import { showTurnRibbon } from '../tween';
import { updateGroundUnits, updatePlayers } from '../util/attribute';
import { system } from '../util/system';

import { playDraw } from './draw';
import { playFight } from './fight';
import { playGeneric } from './generic';
import { playReinforce } from './reinforce';
import { replicateState } from './replicateState';
import { playSummon } from './summon';

let replaying = false;
const { BundleGroup, mergeFragmentToState, runCommand, move } = Engine;

export const minimumReplicateStep = 10;
export const fastReplay = async (): Promise<void> => {
	const remoteHistoryLength = system.history.length;
	const isUpToDate = system.historyLevel >= remoteHistoryLength;

	if (system.winner || replaying || isUpToDate) return;

	replaying = true;

	for (let i = system.historyLevel; i < remoteHistoryLength; i += 1) {
		const bundle = system.history[i];
		const group = bundle?.group;
		const isInitialDraw = group === BundleGroup.InitialDraw;
		const isTurnDraw = group === BundleGroup.TurnDraw;
		const isDraw = isInitialDraw || isTurnDraw;
		const isMyPhase = bundle.phaseOf === system.playerIds.me;

		runCommandBundle(bundle);

		if (i >= remoteHistoryLength - minimumReplicateStep + 1) {
			if (!system.winner && isTurnDraw && isMyPhase) {
				await showTurnRibbon('Your Turn');
			}
			if (isDraw) {
				await playDraw(bundle);
			} else if (BundleGroup.Summon === group) {
				await playSummon(bundle);
			} else if (BundleGroup.FightCombat === group) {
				await playFight(bundle);
			} else if (BundleGroup.Reinforce === group) {
				await playReinforce(bundle);
			} else {
				await playGeneric(bundle);
			}
		} else if (i === remoteHistoryLength - minimumReplicateStep) {
			replicateState();
		}

		updatePlayers();
		updateGroundUnits();
		system.historyLevel += 1;
	}

	replaying = false;
};

export const replay = async (): Promise<void> => {
	const remoteHistoryLength = system.history.length;
	const isUpToDate = system.historyLevel >= remoteHistoryLength;

	if (system.winner || replaying || isUpToDate) return;

	replaying = true;

	for (let i = system.historyLevel; i < remoteHistoryLength; i += 1) {
		const bundle = system.history[i];
		if (!bundle) {
			console.warn(`got undefined bundle at ${i} of duel ${system.matchId}`);
			continue;
		}

		const group = bundle?.group;
		const isInitialDraw = group === BundleGroup.InitialDraw;
		const isTurnDraw = group === BundleGroup.TurnDraw;
		const isDraw = isInitialDraw || isTurnDraw;
		const isMyPhase = bundle.phaseOf === system.playerIds.me;

		runCommandBundle(bundle);

		if (!system.winner && isTurnDraw && isMyPhase) {
			await showTurnRibbon('Your Turn');
		}

		if (isDraw) {
			await playDraw(bundle);
		} else if (BundleGroup.Summon === group) {
			await playSummon(bundle);
		} else if (BundleGroup.FightCombat === group) {
			await playFight(bundle);
		} else if (BundleGroup.Reinforce === group) {
			await playReinforce(bundle);
		} else {
			await playGeneric(bundle);
		}

		updatePlayers();
		updateGroundUnits();
		system.historyLevel += 1;
	}

	replaying = false;

	await replay();
};

export const runCommandBundle = (bundle: DuelCommandBundle): void => {
	bundle.commands.forEach((command) => {
		mergeFragmentToState(
			system.duel,
			runCommand({ duel: system.duel, command }),
		);
	});

	system.predict = move.fight(lodash.cloneDeep(system.duel)).duel;
};
