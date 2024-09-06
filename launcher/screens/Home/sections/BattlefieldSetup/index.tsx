import type { FC } from 'react';
import type { ScaledSize, ViewStyle } from 'react-native';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import { navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

interface Props {
	dimension: ScaledSize;
	responsiveLevel: number;
}

const BattlefieldSetupSection: FC<Props> = ({ dimension, responsiveLevel }) => {
	const width = Math.min(dimension.width, iStyles.contentContainer.maxWidth);
	const backgroundContainer = {
		width,
		height: (width * 1033) / 1728,
		minHeight: 450,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	} as ViewStyle;

	const responsiveVideo = [800, 600, 450, 400][responsiveLevel];

	const onHowToPlayButtonPressed = () =>
		navigate('Guide', { screen: 'Dashboard' });

	return (
		<View style={styles.container}>
			<ImageBackground
				source={resources.home.battlefieldBackground}
				style={[iStyles.wideContainer, backgroundContainer]}
			>
				<Text
					style={[sharedStyle.heading, styles.textShadow]}
					responsiveSizes={headingSize}
				>
					Know Your Battlefield
				</Text>
				<Text style={[sharedStyle.subContent, styles.textShadow]}>
					Under Realm: Rise of Magic is designed to be a well balanced between
					using the combination of your cards and deploying them in an effective
					formation on the battlefield.
				</Text>
				<UnderRealmButton
					style={styles.button}
					onPress={onHowToPlayButtonPressed}
				>
					<Text style={styles.buttonText}>How to play</Text>
				</UnderRealmButton>
				<video
					style={{ width: responsiveVideo, aspectRatio: '800 / 450' }}
					loop
					controls
				>
					<source
						src="https://metacraft-cdn.s3.amazonaws.com/documents/homeStormgate/short_clip_for_web_1.mp4"
						type="video/mp4"
					/>
				</video>
			</ImageBackground>
		</View>
	);
};

export default BattlefieldSetupSection;

const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	button: {
		width: 220,
		marginBottom: 40,
	},
	textShadow: {
		textShadow: '0 0 10px black',
	} as never,
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
});
