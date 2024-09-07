import type { DuelConfig, PlayerConfig } from '@metacraft/murg-engine';
import {
	defaultSetting,
	getInitialState,
	makeMeta,
	move,
} from '@metacraft/murg-engine';

import { generateRandomDeck } from '../util/deck';
import type { DuelRecord } from '../util/type';

const duelCache: Record<string, DuelRecord> = {};

export const fetchDuel = (id: string, version = '00001'): DuelRecord => {
	try {
		if (!duelCache[id]) {
			const meta = makeMeta(version);
			const firstPlayer: PlayerConfig = {
				id: 'A',
				deck: generateRandomDeck(meta),
			};
			const secondPlayer: PlayerConfig = {
				id: 'B',
				deck: generateRandomDeck(meta),
			};
			const config: DuelConfig = {
				version,
				setting: defaultSetting,
				firstMover: firstPlayer.id,
				firstPlayer: firstPlayer,
				secondPlayer: secondPlayer,
			};
			const state = getInitialState({
				version,
				setting: config.setting,
				firstMover: firstPlayer.id,
				firstPlayer: config.firstPlayer,
				secondPlayer: config.secondPlayer,
			});
			const { duel, commandBundles } = move.distributeInitialCards(state);

			if (duel) {
				move.distributeTurnCards(duel).commandBundles.forEach((bundle) => {
					commandBundles.push(bundle);
				});
			}

			duelCache[id] = { config, history: commandBundles };
		}
	} catch (e) {
		console.log(e);
	}

	return duelCache[id];
};
