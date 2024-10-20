import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import type { ModalConfigs } from '@metacraft/ui';
import { Hyperlink, modalActions, Text } from '@metacraft/ui';
import { useWallet } from '@solana/wallet-adapter-react';
import {
	checkInstalledLayout,
	installLayout,
	openLayoutPopup,
} from '@walless/adapter-solana-base';
import { useProfile } from 'utils/hooks';
import { signOut } from 'utils/lib/auth';
import { setPendingRedirect } from 'utils/lib/auth/redirect';
import { noSelect } from 'utils/styles';

interface Props {
	config: ModalConfigs;
}

const underrealmLayoutId = '000003';

const styles = StyleSheet.create({
	container: {
		...noSelect,
		minWidth: 120,
		backgroundColor: '#0b0d12',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.025)',
	},
	heading: {
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginVertical: 6,
	},
	hyperLink: {
		fontSize: 11,
		textAlign: 'center',
		marginVertical: 6,
	},
});

export const SignedMenu: FC<Props> = ({ config }) => {
	const [isWallessConnected, setIsWallessConnected] = useState(false);
	const [isLayoutInstalled, setIsLayoutInstalled] = useState(false);
	const { wallet, connected } = useWallet();
	const { profile, refetch } = useProfile();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onMyProfilePress = async () => {
		if (isWallessConnected) {
			if (isLayoutInstalled) {
				openLayoutPopup(underrealmLayoutId);
			} else {
				const isSuccessfullyInstalled = await installLayout(underrealmLayoutId);
				setIsLayoutInstalled(isSuccessfullyInstalled);
			}
		} else {
			Linking.openURL(`https://stormgate.io/profile/${profile.address}`);
		}
		modalActions.hide(config.id as string);
	};

	const innerSignOut = async () => {
		setPendingRedirect();
		await signOut();
		await wallet.adapter.disconnect();
		try {
			await refetch();
		} catch (err) {
			console.log(err);
		}
		modalActions.hide(config.id as string);
	};

	useEffect(() => {
		if (connected) {
			console.log('run check layout');
			setIsWallessConnected(
				wallet?.adapter.name.toLocaleLowerCase() === 'walless',
			);
		}
	}, [wallet, connected]);

	useEffect(() => {
		const layoutCheck = async () => {
			const isInstalled = await checkInstalledLayout(underrealmLayoutId);
			setIsLayoutInstalled(isInstalled);
		};

		if (isWallessConnected) {
			layoutCheck();
		}
	}, [isWallessConnected]);

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Signed Menu</Text>
			{/* <Hyperlink
				style={styles.hyperLink}
				onPress={onMyProfilePress}
				title="My Profile"
			/> */}
			<Hyperlink
				style={styles.hyperLink}
				onPress={innerSignOut}
				title="Sign Out"
			/>
		</View>
	);
};

export default SignedMenu;
