import { modalActions } from '@metacraft/ui';
import SignInOptions from 'components/modals/SignInOptions';

import { accountState } from './internal';

export const setForceConnect = (flag: boolean): void => {
	accountState.forceConnect = flag;
};

export const showConnectWallet = (): void => {
	modalActions.show({
		id: 'walletConnect',
		component: SignInOptions,
		maskActiveOpacity: 0.8,
		context: { web3Only: true },
	});
};
