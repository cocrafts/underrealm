import type { WalletAdapterNetwork as Network } from '@solana/wallet-adapter-base';
import config from 'utils/config';
import { proxy } from 'valtio';

interface AppState {
	counter: number;
	privacy: boolean;
	network: Network;
}

export const appState = proxy<AppState>({
	counter: 0,
	privacy: false,
	network: config.solanaCluster,
});
