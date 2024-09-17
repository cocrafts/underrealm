import type { CardDuel } from 'utils/graphql';
import { proxy } from 'valtio/vanilla';

export interface BridgeState {
	duelId?: string;
	duel?: CardDuel;
}

export const bridgeState = proxy<BridgeState>({});
