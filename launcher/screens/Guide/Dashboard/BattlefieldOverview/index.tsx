import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Markdown, Text } from '@metacraft/ui';
import { battlefield } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';

const BattlefieldOverview: FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageSize = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginBottom: 20,
	};

	const renderDescription = (des: string) => {
		return (
			<View style={[sharedStyle.subHeading, styles.conceptContent]}>
				<Markdown content={des} />
			</View>
		);
	};

	const renderImage = (source: number) => {
		return (
			<View style={styles.imageWrapper}>
				<Image source={source} style={imageSize} resizeMode="contain" />
			</View>
		);
	};

	return (
		<View style={sharedStyle.sectionContainer}>
			<Text
				responsiveSizes={headingSize}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Battlefield Overview
			</Text>
			<Concept
				content={battlefield}
				renderDescription={renderDescription}
				renderImage={renderImage}
			/>

			<View />
		</View>
	);
};

export default BattlefieldOverview;

const styles = StyleSheet.create({
	conceptContainer: {
		justifyContent: 'space-between',
		paddingTop: 40,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	conceptContent: {
		paddingTop: 0,
	},
	imageWrapper: {
		alignSelf: 'center',
	},
});
