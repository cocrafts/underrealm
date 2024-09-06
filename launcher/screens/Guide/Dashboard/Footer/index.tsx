import type { FC } from 'react';
import type { ImageStyle } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { navigate } from 'stacks/Browser/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const Footer: FC<Record<string, unknown>> = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.contentContainer.maxWidth);
	const backgroundImage = {
		width,
		height: (width * 385) / 1555,
		position: 'absolute',
		bottom: 0,
	} as ImageStyle;

	const imageSize = {
		width: '100%',
		height: windowSize.width * 0.45 * (222 / 884),
	} as ImageStyle;

	const ratio = responsiveLevel > 1 ? responsiveLevel : 1;

	const navigateToGame = () => navigate('Game', { screen: 'Dashboard' });

	return (
		<View
			style={[
				styles.container,
				{
					height: backgroundImage.height,
				},
			]}
		>
			<Image
				source={resources.guide.footerMainBackground}
				style={[iStyles.wideContainer, backgroundImage]}
			/>
			<Image
				source={resources.guide.footerContentBackground}
				style={imageSize}
				resizeMode="contain"
			/>
			<View
				style={[
					styles.contentContainer,
					{
						height: imageSize.height,
					},
				]}
			>
				<Text
					style={[
						styles.title,
						{
							marginTop: 30 / ratio,
						},
					]}
					responsiveSizes={[35 / ratio]}
				>
					START YOUR ADVENTURE
				</Text>
				<Text style={{ color: '#000' }} responsiveSizes={[20 / ratio]}>
					Create your account to start playing
				</Text>
				<UnderRealmButton
					style={{
						...styles.button,
						bottom: responsiveLevel > 1 ? -30 : -15,
						width: 250 / ratio,
					}}
					onPress={navigateToGame}
				>
					<Text
						style={{
							textAlign: 'center',
						}}
						responsiveSizes={[14 / ratio]}
					>
						{'Ready to play?\nPlay now'}
					</Text>
				</UnderRealmButton>
			</View>
		</View>
	);
};

export default Footer;

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentContainer: {
		position: 'absolute',
		alignItems: 'center',
	},
	title: {
		color: '#000',
		fontWeight: 'bold',
		fontFamily: 'Volkov',
	},
	button: {
		position: 'absolute',
	},
});
