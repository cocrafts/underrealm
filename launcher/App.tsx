import type { FC } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { modalActions, Provider as MetacraftProvider } from '@metacraft/ui';
import type { WalletError } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import ReferralModal, { REFERRAL_MODAL_ID } from 'components/modals/Referral';
import BrowserStack from 'stacks/Browser/Container';
import { graphQlClient } from 'utils/graphql';
import { clusterUrl } from 'utils/helper';
import { useAppInit, useSnapshot } from 'utils/hook';
import { stateActions } from 'utils/state';
import { accountState } from 'utils/state/account';
import { appState } from 'utils/state/app';
import { launcherTheme } from 'utils/theme';

import './utils/unistyles';

export const App: FC = () => {
	const { network } = useSnapshot(appState);
	const endpoint = useMemo(() => clusterUrl(network), [network]);
	const { profile, loading, forceConnect } = useSnapshot(accountState);
	const autoConnect = forceConnect || (!loading && !profile.id);
	const wallets = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
		[network],
	);

	const useError = () => {
		return useCallback((error: WalletError) => {
			console.log(error);
		}, []);
	};

	useAppInit({
		withProfileFetch: true,
		onSignOut: () => {
			stateActions.clearAll();
		},
	});

	useEffect(() => {
		if (profile.id && !profile.referred?.id) {
			modalActions.show({
				id: REFERRAL_MODAL_ID,
				component: ReferralModal,
				withoutMask: true,
			});
		}
	}, [profile.id, profile.referred?.id]);

	return (
		<ApolloProvider client={graphQlClient}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider
					autoConnect={autoConnect}
					wallets={wallets}
					onError={useError}
				>
					<MetacraftProvider theme={launcherTheme}>
						<BrowserStack />
					</MetacraftProvider>
				</WalletProvider>
			</ConnectionProvider>
		</ApolloProvider>
	);
};

export default App;
