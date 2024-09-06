import type { FC } from 'react';
import { Fragment } from 'react';
import type { ViewStyle } from 'react-native';
import {
	ActivityIndicator,
	ImageBackground,
	StyleSheet,
	View,
} from 'react-native';
import { Hyperlink, modalActions, Text } from '@metacraft/ui';
import { useWallet } from '@solana/wallet-adapter-react';
import Countdown from 'components/Countdown';
import Accordion from 'components/Marketplace/Accordion';
import Card from 'components/Marketplace/Card';
import SignInOptions from 'components/modals/SignInOptions';
import resources from 'launcher/utils/resources';
import type { PackStats, Rarity } from 'screens/Mint/shared';
import type { SugarEffect } from 'utils/hook';
import { iStyles } from 'utils/styles';

import PurchaseButton from './PurchaseButton';

interface Props {
	pack: PackStats;
	sugar: SugarEffect;
	isLoading?: boolean;
	onPurchase?: (volume: number) => void;
}

export const PackDetailSection: FC<Props> = ({
	pack,
	sugar,
	isLoading,
	onPurchase,
}) => {
	const { connected, disconnect } = useWallet();
	const {
		isActive,
		isPresale,
		isWhitelistUser,
		isValidBalance,
		itemsRemaining,
		itemsAvailable,
		price,
		discountPrice,
	} = sugar;
	const isEarlyPurchase = isPresale && isWhitelistUser;
	const isPurchasable = isActive || isEarlyPurchase;
	const allowPurchase = connected && isValidBalance && isPurchasable;
	const officialPrice = isWhitelistUser ? discountPrice : price;
	const purchasePrefix = isWhitelistUser ? 'WHITELIST MINT' : 'MINT';
	const progressBarInner = {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		width: (itemsRemaining / itemsAvailable) * 100 + '%',
		borderRadius: 10,
		backgroundColor: '#dabe8c',
	} as ViewStyle;

	const onConnectWalletPress = (): void => {
		modalActions.show({
			id: 'signInOptions',
			component: SignInOptions,
			maskActiveOpacity: 0.8,
			context: { web3Only: true },
		});
	};

	return (
		<View style={[iStyles.contentContainer, styles.container]}>
			<View style={styles.rowContainer}>
				<View style={styles.innerContainer}>
					<Card size={350} animationFlipDisable={true} />
				</View>
				<View style={styles.innerContainer}>
					<View style={{ width: 350, alignItems: 'center' }}>
						{isPresale && (
							<Fragment>
								<Countdown
									style={styles.countdown}
									endTime={new Date(1667502000000)}
								/>
								<Text style={styles.countdownExplains}>UNTIL PUBLIC MINT</Text>
							</Fragment>
						)}
						<ImageBackground
							source={resources.marketplace.titleSeparator}
							style={{ width: '100%', paddingVertical: 15 }}
						>
							<Text
								responsiveSizes={[20]}
								style={[styles.title, { textAlign: 'center' }]}
							>
								{pack.title} Pack
							</Text>
						</ImageBackground>
						<Text style={{ width: '100%', paddingVertical: 15 }}>
							Number of Card/Pack: 1 Card
						</Text>
						{sugar.isLoading ? (
							<ActivityIndicator size="large" />
						) : (
							<Fragment>
								<View
									style={[
										styles.rowContainer,
										{ width: '100%', alignItems: 'center' },
									]}
								>
									<View style={styles.progressBarContainer}>
										<View style={progressBarInner} />
									</View>
									<Text style={{ marginLeft: 20, color: '#ddd2af' }}>
										{`${itemsRemaining}/${itemsAvailable}`}
									</Text>
								</View>
								{itemsRemaining > 0 ? (
									[1].map((amount) => {
										return (
											<PurchaseButton
												key={amount}
												disabled={!allowPurchase}
												amount={amount}
												unitPrice={officialPrice}
												title={`${purchasePrefix} ${amount} PACK`}
												isLoading={isLoading}
												onPress={() => onPurchase?.(amount)}
											/>
										);
									})
								) : (
									<Text
										responsiveSizes={[25]}
										style={{ marginTop: 15, fontWeight: '600' }}
									>
										SOLD OUT
									</Text>
								)}
							</Fragment>
						)}

						<View style={{ marginTop: 15, opacity: 0.5 }}>
							{connected ? (
								<Text style={{ fontWeight: '300', fontSize: 12 }}>
									<Hyperlink title="Disconnect Wallet" onPress={disconnect} />
								</Text>
							) : (
								<Text style={{ fontWeight: '300', fontSize: 12 }}>
									<Hyperlink
										title="Connect Wallet"
										onPress={onConnectWalletPress}
									/>{' '}
									to buy
								</Text>
							)}
						</View>
						<View style={{ width: 350 }}>
							<Text responsiveSizes={[20]} style={styles.title}>
								Rarity Rate (from low to high)
							</Text>
							<View style={styles.stripeSeparator} />
							{Object.keys(pack.rarity).map((item) => (
								<View
									style={[
										styles.rowContainer,
										{ justifyContent: 'space-between', paddingVertical: 5 },
									]}
									key={item}
								>
									<Text style={styles.rarityTitle}>{item}</Text>
									<Text style={styles.rarityValue}>{`${
										pack.rarity[item as Rarity]
									}%`}</Text>
								</View>
							))}
						</View>
					</View>
				</View>
			</View>
			<View style={styles.rowContainer}>
				<View style={styles.innerContainer}>
					<View style={{ width: 350 }}>
						<Accordion
							title={
								<Fragment>
									<Text responsiveSizes={[20]} style={styles.title}>
										Information
									</Text>
									<View style={[styles.stripeSeparator, { width: 350 }]} />
								</Fragment>
							}
							defaultExpanded={true}
						>
							<Hyperlink
								title="Explore this pack"
								href={`https://www.solaneyes.com/address/${pack.sugarId}`}
							/>
						</Accordion>
					</View>
				</View>
				<View style={styles.innerContainer}>
					<View style={{ width: 350 }} />
				</View>
			</View>
		</View>
	);
};

export default PackDetailSection;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 100,
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	innerContainer: {
		marginHorizontal: 40,
		marginBottom: 20,
		alignItems: 'center',
	},
	title: {
		color: '#cdc8b5',
		paddingVertical: 10,
		fontWeight: '500',
	},
	countdown: {
		marginTop: 14,
	},
	countdownExplains: {
		fontSize: 11,
		fontWeight: '700',
		marginTop: 8,
		marginBottom: 24,
	},
	progressBarContainer: {
		position: 'relative',
		marginVertical: 10,
		flex: 1,
		height: 10,
		borderRadius: 10,
		backgroundColor: '#4d4a44',
	},
	buttonBackground: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 30,
	},
	packPrice: {
		textAlign: 'center',
	},
	priceContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	coinIcon: {
		width: 15,
		height: 15,
		marginRight: 10,
	},
	stripeSeparator: {
		width: '100%',
		height: 3,
		backgroundColor: '#3e2c26',
		marginBottom: 10,
	},
	rarityTitle: {
		fontWeight: '300',
		color: '#6a6158',
	},
	rarityValue: {
		fontWeight: '300',
		color: '#cdc8b5',
	},
});
