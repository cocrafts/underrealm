import { useMemo } from 'react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterUrl } from 'utils/helper';
import { appState } from 'utils/state/app';
import { useSnapshot } from 'valtio';

export const useWalletAdapters = () => {
	const { network } = useSnapshot(appState);
	const adapters = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
		[network],
	);

	return adapters;
};

export const useNetworkEndpoint = () => {
	const { network } = useSnapshot(appState);
	return useMemo(() => clusterUrl(network), [network]);
};
