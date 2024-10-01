import type { DuelCommandBundle } from '@underrealm/murg';

import { system } from '../util/system';

const searchParams = new URLSearchParams(location.search);
const wsParam = searchParams.get('ws');
const wsUri =
	wsParam || localStorage?.getItem('GAME_WS_URI') || 'ws://localhost:3005/ws';

console.log('Game Websocket URI', wsUri);

export const ws = new WebSocket(wsUri);

export interface MergeHistoryResult {
	conflict: boolean;
}

export const mergeRemoteHistory = (
	bundles: DuelCommandBundle[],
	level: number,
): MergeHistoryResult => {
	if (system.history.length < level) {
		return { conflict: true };
	}

	system.history = system.history.slice(0, level).concat(bundles);

	return { conflict: false };
};
