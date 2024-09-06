import type { FC } from 'react';
import type { ScaledSize } from 'react-native';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import resources from 'utils/resources';

interface Props {
	responsiveLevel: number;
	dimension: ScaledSize;
}

const ElementalInteractionSection: FC<Props> = ({
	responsiveLevel,
	dimension,
}) => {
	const maxWidthSubContent = Math.min(
		sharedStyle.subContent.maxWidth,
		dimension.width,
	);
	const visualSize = [700, 600, 500, 360][responsiveLevel];
	const marginVertical = [40, 40, 40, 15][responsiveLevel];
	const backgroundHeight = visualSize + 200;
	const backgroundImageSize = {
		width: backgroundHeight * 1.4085,
		height: backgroundHeight,
	};
	const visualImageSize = {
		width: visualSize,
		height: visualSize,
		marginVertical,
	};

	return (
		<ImageBackground
			style={[styles.container, { paddingVertical: 40 }]}
			source={resources.home.elementalInteractionFirstBackground}
		>
			<Text
				style={[sharedStyle.heading, styles.heading, styles.blackText]}
				responsiveSizes={headingSize}
			>
				Elemental Interaction
			</Text>
			<ImageBackground
				source={resources.home.elementalInteractionSecondBackground}
				style={[backgroundImageSize, styles.imageContainer]}
			>
				<Text
					style={[
						sharedStyle.subContent,
						styles.blackText,
						{ maxWidth: maxWidthSubContent },
					]}
				>
					Each card will have an element and the element will interact uniquely
					on the battlefield as the Generating and Overcoming processes. Knowing
					this will give you an extra chance to win a battle by combining the
					action of cards accordingly.
				</Text>
				<Image
					source={resources.home.elementalInteractionVisual}
					style={visualImageSize}
				/>
				{/* <UnderRealmButton style={styles.button}>
					<Text style={sharedStyle.buttonText}>Explore more</Text>
				</UnderRealmButton> */}
			</ImageBackground>
		</ImageBackground>
	);
};

export default ElementalInteractionSection;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	heading: {
		fontFamily: 'Volkhov',
	},
	blackText: {
		color: '#000',
		paddingBottom: 0,
	},
	imageContainer: {
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	button: {
		width: 200,
	},
});
