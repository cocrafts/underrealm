import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet, View } from 'react-native';
import type { ScaledSizes } from '@metacraft/ui';
import { Text } from '@metacraft/ui';
import { stormIcons } from 'components/icons';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const { Realm } = stormIcons;

interface Props {
	style?: ViewStyle;
}

export const BannerSection: FC<Props> = ({ style }) => {
	return (
		<ImageBackground
			style={[iStyles.contentContainer, styles.container, style]}
			source={resources.mint.keyVisual}
		>
			<View style={styles.maskContainer}>
				<Realm
					style={styles.realmIcon}
					size={300}
					color="rgba(255, 255, 255, 0.12)"
				/>
			</View>
			<View style={styles.contentContainer}>
				<Text style={styles.heading} responsiveSizes={responsiveHeadings}>
					Get Genesis NFT Card
				</Text>
				<Text style={styles.intro}>
					The very first and one of the largest Genesis card minting of{' '}
					<Text style={styles.bold}>2,373 Genenis NFTs</Text> where you can get
					unique chance to purchase and own those NFTs. Choose a Pack and get
					one of the most valuable Genesis NFT ever!
				</Text>
			</View>
		</ImageBackground>
	);
};

export default BannerSection;

const responsiveHeadings: ScaledSizes = [40, 38, 32, 24];

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 70,
		paddingBottom: 20,
		marginBottom: 10,
		height: 678,
	},
	contentContainer: {
		position: 'relative',
		alignItems: 'center',
	},
	maskContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	realmIcon: {},
	heading: {
		color: '#fff',
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 28,
		textShadow: '0 0 5px black',
	},
	intro: {
		maxWidth: 800,
		fontSize: 18,
		textAlign: 'center',
		textShadow: '0 0 10px black',
	},
	bold: {
		fontWeight: '500',
	},
});
