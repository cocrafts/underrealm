import type { CardDuel } from 'utils/types/graphql';
import { proxy } from 'valtio/vanilla';

export interface BridgeState {
	duelId?: string;
	duel?: CardDuel;
}

export const bridgeState = proxy<BridgeState>({});
