import type { FC } from 'react';
import type { ScaledSize } from 'react-native';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import resources from 'utils/resources';

interface Props {
	dimension: ScaledSize;
	responsiveLevel: number;
}

export const CardExplainSection: FC<Props> = ({
	dimension,
	responsiveLevel,
}) => {
	const imageWidth = Math.min(dimension.width, 992) - 30;
	const imageStyle = {
		width: imageWidth,
		height: imageWidth * 0.7268,
	};
	const heightRatio = [1.2, 1.4, 1.5, 2][responsiveLevel];

	return (
		<View style={styles.container}>
			<ImageBackground
				source={resources.home.cardExplainBackground}
				style={[styles.background, { height: imageWidth * heightRatio }]}
			>
				<View>
					<Text style={sharedStyle.heading} responsiveSizes={headingSize}>
						Recruit Heroes, Build Your Army, Fight Battles!
					</Text>
					<Text style={styles.subText}>
						Collect cards, combine them as you see fit, and test them in the
						heat of the battlefield. That’s where the fun is. Knowing your card
						deck and how to combine them in the battle is the key to winning.
						The limit is your imagination!
					</Text>
				</View>
				<Image source={resources.home.cardExplain} style={imageStyle} />
				<View style={styles.buttonContainer}>
					{/* <UnderRealmButton
						disabled
						isSubButton
						style={styles.button}
						onPress={onMintPress}
					>
						<Text style={sharedStyle.buttonText}>Mint NFT</Text>
						<Text style={styles.buttonSubText}>Coming soon</Text>
					</UnderRealmButton> */}
					{/* <UnderRealmButton
						isSubButton
						style={styles.button}
						onPress={onMintPress}
					>
						<Text style={sharedStyle.buttonText}>Explore Card</Text>
					</UnderRealmButton> */}
				</View>
			</ImageBackground>
		</View>
	);
};

export default CardExplainSection;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	subText: {
		marginBottom: 20,
		textAlign: 'center',
		color: '#fff',
		maxWidth: 800,
	},
	background: {
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},
	button: {
		width: 220,
		marginTop: 15,
		marginHorizontal: 10,
		height: 45,
		paddingVertical: 0,
		justifyContent: 'center',
	},
	buttonSubText: {
		textAlign: 'center',
		fontSize: 10,
		color: '#fff',
		fontWeight: '300',
	},
});
