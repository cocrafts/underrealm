import { DuelCommandBundle } from '@metacraft/murg-engine';

import { system } from '../util/system';

// const wsUri = 'ws://localhost:3006';
const wsUri = 'wss://94zbw8sdk9.execute-api.ap-northeast-1.amazonaws.com/prod/';

export const connectionInstance = new WebSocket(wsUri);

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

	return {
		conflict: false,
	};
};
