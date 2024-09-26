import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import type { CandyMachineV2 } from '@metaplex-foundation/js';
import { Metaplex, walletAdapterIdentity } from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Loading from 'components/Loading';
import Card from 'components/Marketplace/Card';
import type { PackStats } from 'screens/Mint/shared';
import resources from 'utils/resources';

interface Props {
	item: PackStats;
	onPress?: (item: PackStats) => void;
}

export const PackBundle: FC<Props> = ({ item, onPress }) => {
	const { title, unitPrice, sugarId } = item;
	const { publicKey, signMessage, signTransaction } = useWallet();
	const { connection } = useConnection();
	const mplRef = useRef<Metaplex>();
	const sugarRef = useRef<CandyMachineV2>();
	const [isLoading, setIsLoading] = useState(false);
	const progressBarInner =
		sugarRef.current &&
		({
			position: 'absolute',
			top: 0,
			bottom: 0,
			left: 0,
			width:
				(sugarRef.current?.itemsRemaining.toNumber() /
					sugarRef.current?.itemsAvailable.toNumber()) *
					100 +
				'%',
			borderRadius: 10,
			backgroundColor: '#dabe8c',
		} as ViewStyle);

	useEffect(() => {
		const injectRefs = async () => {
			setIsLoading(true);

			const address = new PublicKey(sugarId);
			const walletAdapter = walletAdapterIdentity({
				publicKey,
				signMessage,
				signTransaction,
			});
			const metaplex = Metaplex.make(connection).use(walletAdapter);
			const sugar = await metaplex.candyMachinesV2().findByAddress({ address });

			setIsLoading(false);
			mplRef.current = metaplex;
			sugarRef.current = sugar;
		};

		injectRefs();
	}, [sugarId, connection, publicKey, signMessage, signTransaction]);

	return (
		<View style={styles.container}>
			<Card animationFlipDisable onPress={() => onPress?.(item)} />
			<View style={styles.contentContainer}>
				{isLoading ? (
					<Loading />
				) : (
					<View style={styles.packInfo}>
						<Text style={styles.packTitle} responsiveSizes={[16]}>
							{title}
							{''} Pack
						</Text>
						<Text style={styles.packQuant}>
							{`${sugarRef.current?.itemsRemaining}/${sugarRef.current?.itemsAvailable}`}
						</Text>
						<View style={styles.progressBarContainer}>
							<View style={progressBarInner} />
						</View>
						<View style={styles.priceContainer}>
							<Image
								source={resources.marketplace.coinUsd}
								style={styles.coinIcon}
							/>
							<Text>USDC {unitPrice}</Text>
						</View>
					</View>
				)}
			</View>
		</View>
	);
};

export default PackBundle;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: 20,
		width: 200,
	},
	contentContainer: {
		paddingTop: 15,
	},
	packInfo: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		alignContent: 'center',
	},
	packTitle: {
		fontWeight: '500',
	},
	packQuant: {
		color: '#7b705e',
	},
	progressBarContainer: {
		position: 'relative',
		marginVertical: 10,
		width: '100%',
		height: 10,
		borderRadius: 10,
		backgroundColor: '#4d4a44',
	},
	packPrice: {
		textAlign: 'center',
	},
	priceContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	coinIcon: {
		width: 15,
		height: 15,
		marginRight: 10,
	},
});
