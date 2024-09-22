import { syncProfile } from './profile';
import { setForceConnect, showConnectWallet } from './wallet';

export const accountActions = {
	syncProfile,
	setForceConnect,
	showConnectWallet,
};

export * from './internal';
