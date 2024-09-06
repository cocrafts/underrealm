import { syncProfile, walletSignIn } from './authentication';
import { setForceConnect, showConnectWallet } from './wallet';

export const accountActions = {
	syncProfile,
	walletSignIn,
	setForceConnect,
	showConnectWallet,
};

export * from './internal';
