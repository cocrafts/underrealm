import type { FC } from 'react';
import type { ImageStyle, ScaledSize } from 'react-native';
import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Hyperlink, modalActions, Text } from '@metacraft/ui';
import type { NftWithToken } from '@metaplex-foundation/js';
import Card from 'components/Marketplace/Card';
import resources from 'utils/resources';

import { getRarityTitle } from '../shared';

interface Props {
	dimensions: ScaledSize;
	nft: NftWithToken;
}

export const PurchaseSuccessModal: FC<Props> = ({ dimensions, nft }) => {
	const width = Math.min(dimensions.width - 40, 1000);
	const imageSource = nft.uri.replace('.json', '.png');
	console.log(nft);
	const rarity = nft.name.slice(-6, -4);
	const rarityTitle = getRarityTitle(rarity);

	return (
		<View style={[styles.container, { width }]}>
			<Image
				source={resources.marketplace.popupBackground}
				style={styles.background}
			/>
			<Image source={resources.marketplace.popupBorder} style={styles.top} />
			<Image source={resources.marketplace.popupBorder} style={styles.bottom} />
			<Image source={resources.marketplace.popupBorder} style={styles.left} />
			<Image source={resources.marketplace.popupBorder} style={styles.right} />
			<View style={[styles.contentContainer, { width }]}>
				<TouchableOpacity
					style={styles.closeButtonContainer}
					onPress={() => modalActions.hide('Successful Buying')}
				>
					<Text style={styles.closeButton}>&times;</Text>
				</TouchableOpacity>
				<Text
					responsiveSizes={[20]}
					style={{
						fontWeight: '500',
						marginTop: 30,
						marginBottom: 15,
						textAlign: 'center',
						color: '#fff',
					}}
				>
					You have successfully purchased{' '}
					<Text style={{ color: '#ccb182' }}>1</Text> NFT Card
				</Text>
				<Text style={{ textAlign: 'center', marginBottom: 30 }}>
					Please check your Wallet for the NFT. Chat with us on{' '}
					<Hyperlink
						title="Discord"
						onPress={() => Linking.openURL('https://discord.gg/sXcz9Em4AR')}
					/>{' '}
					if any support needed.
				</Text>
				<ScrollView
					contentContainerStyle={{
						paddingVertical: 20,
						flexDirection: 'row',
						marginHorizontal: 'auto',
					}}
					horizontal
					showsHorizontalScrollIndicator={false}
				>
					<View style={styles.nftShowContainer}>
						<Card
							animationFlipDisable
							ratio={1.38}
							isCardUp={false}
							imageSource={imageSource}
							style={{ marginHorizontal: 10 }}
						/>
						<View style={styles.rarityContainer}>
							<Text style={styles.rarityText}>{rarityTitle}</Text>
							<Text
								style={styles.subRarityText}
							>{`(Rarity level ${rarity}/16)`}</Text>
						</View>
					</View>
				</ScrollView>
				<View style={{ marginVertical: 30 }}>
					<Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
						*Some Hero characters visual are not available yet and will be
						revealed later.
					</Text>
				</View>
			</View>
		</View>
	);
};

export default PurchaseSuccessModal;

const borderVertical = {
	position: 'absolute',
	width: 10,
	top: 0,
	bottom: 0,
} as ImageStyle;

const borderHorizontal = {
	position: 'absolute',
	height: 10,
	left: 0,
	right: 0,
} as ImageStyle;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	background: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	top: {
		...borderHorizontal,
		top: 0,
	},
	bottom: {
		...borderHorizontal,
		bottom: 0,
	},
	left: {
		...borderVertical,
		left: 0,
	},
	right: {
		...borderVertical,
		right: 0,
	},
	closeButtonContainer: {
		position: 'absolute',
		top: 20,
		right: 20,
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	closeButton: {
		color: '#524242',
		fontSize: 40,
		fontWeight: '300',
		lineHeight: 30,
	},
	contentContainer: {
		padding: 30,
		position: 'relative',
	},
	nftShowContainer: {
		alignItems: 'center',
	},
	rarityContainer: {
		paddingVertical: 20,
		alignItems: 'center',
	},
	rarityText: {
		color: '#ccb182',
		fontSize: 34,
		lineHeight: 34,
	},
	subRarityText: {
		color: '#fff',
		fontSize: 24,
	},
});
