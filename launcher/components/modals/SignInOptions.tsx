import type { FC } from 'react';
import { Fragment, useCallback, useEffect, useRef } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import type { ModalConfigs } from '@metacraft/ui';
import { Button, modalActions, themeState } from '@metacraft/ui';
import type { WalletAdapterProps } from '@solana/wallet-adapter-base';
import { WalletReadyState } from '@solana/wallet-adapter-base';
import { useWallet } from '@solana/wallet-adapter-react';
import Text from 'components/Text';
import { accountActions } from 'state/account';
import { useProfile, useSnapshot } from 'utils/hooks';
import { googleSignIn, walletSignIn } from 'utils/lib';

import { modalStyles } from './shared';

interface Props {
	config: ModalConfigs;
}

interface ModalContext {
	web3Only: boolean;
}

export const SignInOptions: FC<Props> = ({ config }) => {
	const { web3Only } = (config?.context || {}) as ModalContext;
	const { profile } = useProfile();

	const { colors } = useSnapshot(themeState);
	const fromSelectRef = useRef(false);
	const { wallets, select, connected, disconnect, publicKey, signMessage } =
		useWallet();

	const containerStyle = [
		modalStyles.container,
		{ backgroundColor: colors.background, minWidth: 304 },
	];

	const selectWallet = useCallback(
		async (adapter: WalletAdapterProps) => {
			if (adapter.readyState === WalletReadyState.Installed) {
				fromSelectRef.current = true;
				select(adapter.name);
			} else {
				await Linking.openURL(adapter.url);
			}
		},
		[select],
	);

	const disconnectWallet = useCallback(async () => {
		await disconnect();
	}, [disconnect]);

	const signInWallet = useCallback(async () => {
		modalActions.hide(config.id as string);

		if (profile?.address !== publicKey?.toString()) {
			const challengedUser = await walletSignIn(
				publicKey.toString(),
				signMessage,
				disconnectWallet,
			);

			if (challengedUser) {
				window.location.reload();
			}
		}
	}, [connected, publicKey, signMessage]);

	const signInGoogle = async () => {
		modalActions.hide(config.id as string);
		await googleSignIn();
	};

	useEffect(() => {
		accountActions.setForceConnect(true);

		return () => accountActions.setForceConnect(false);
	}, []);

	useEffect(() => {
		if (
			connected &&
			fromSelectRef.current &&
			publicKey?.toString() !== profile?.address
		) {
			fromSelectRef.current = false;
			signInWallet();
		}
	}, [publicKey, connected]);

	return (
		<View style={containerStyle}>
			<Text style={modalStyles.modalTitle}>Wallet Sign-In</Text>
			{wallets.map(({ readyState, adapter }, i) => {
				const isReady = readyState === WalletReadyState.Installed;

				return (
					<Button
						key={i}
						outline
						style={modalStyles.buttonContainer}
						title={adapter.name}
						titleStyle={!isReady && styles.idleTitle}
						onPress={() => selectWallet?.(adapter)}
					/>
				);
			})}
			{!web3Only && (
				<Fragment>
					{/*<FantasySeparator style={styles.separator} />*/}
					<Text style={[modalStyles.modalTitle, { marginTop: 12 }]}>
						Simple Sign-In
					</Text>
					<Button
						outline
						style={modalStyles.buttonContainer}
						title="Google"
						onPress={signInGoogle}
					/>
				</Fragment>
			)}
		</View>
	);
};

export default SignInOptions;

const styles = StyleSheet.create({
	separator: {
		marginTop: 12,
		marginBottom: 8,
	},
	idleTitle: {
		color: 'rgba(255, 255, 255, 0.2)',
	},
});
