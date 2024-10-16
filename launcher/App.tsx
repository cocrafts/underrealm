import type { FC } from 'react';
import { useCallback, useEffect } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as MetacraftProvider } from '@metacraft/ui';
import type { WalletError } from '@solana/wallet-adapter-base';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import BrowserStack from 'stacks/Browser/Container';
import { accountState } from 'state/account';
import { graphQlClient } from 'utils/graphql';
import {
	useAppInit,
	useProfile,
	useRequireReferral,
	useSnapshot,
} from 'utils/hooks';
import { useLatestVersion } from 'utils/hooks/latestVersion';
import { useNetworkEndpoint, useWalletAdapters } from 'utils/hooks/web3';
import { extractReferralFromUrl } from 'utils/referral';
import { launcherTheme } from 'utils/styles';

import './utils/styles';

const InternalApp: FC = () => {
	const { forceConnect } = useSnapshot(accountState);
	const { profile, loading } = useProfile();
	const autoConnect = forceConnect || (!loading && !profile.id);

	const wallets = useWalletAdapters();
	const endpoint = useNetworkEndpoint();

	const handleWalletError = useCallback((error: WalletError) => {
		console.log(error);
	}, []);

	useLatestVersion();
	useRequireReferral();
	useAppInit();

	useEffect(() => {
		extractReferralFromUrl();
	}, []);

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider
				autoConnect={autoConnect}
				wallets={wallets}
				onError={handleWalletError}
			>
				<MetacraftProvider theme={launcherTheme}>
					<BrowserStack />
				</MetacraftProvider>
			</WalletProvider>
		</ConnectionProvider>
	);
};

export const App = () => {
	return (
		<ApolloProvider client={graphQlClient}>
			<InternalApp />
		</ApolloProvider>
	);
};

export default App;
