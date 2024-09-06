import type React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState, Text } from '@metacraft/ui';
import { sharedStyle } from 'screens/Story/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

import Timeline from './Timeline';

const backgroundRatio = 1007 / 1728;
const Header: React.FC = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);

	const width = Math.max(1728, windowSize.width);
	const contentWidth = Math.min(windowSize.width, 700);

	const headingBackgroundStyle = {
		width,
		height: width * backgroundRatio,
	};

	return (
		<View style={{ height: headingBackgroundStyle.height }}>
			<Image
				source={resources.story.headerBackground}
				resizeMode="contain"
				style={[styles.imageBackground, headingBackgroundStyle]}
			/>
			<View style={styles.container}>
				<Image
					source={resources.story.headerFlag}
					style={styles.imageFlag}
					resizeMode="contain"
				/>
				<View style={[styles.contentContainer, { width: contentWidth }]}>
					<Text
						style={[sharedStyle.heading, styles.heading]}
						responsiveSizes={[35]}
					>
						Under Realm Rise of Magic
					</Text>
					<Text
						style={[styles.description, { width: contentWidth }]}
						responsiveSizes={[20]}
					>
						Under Realm: Rise of Magic takes place in a chaotic, fragmented
						world of ATEM where human and other races are constantly fighting
						each other, to wrench the endless thrist for power, wealth, and
						gradually take control over ATEM.
					</Text>
				</View>
				{<Timeline isNarrow={responsiveLevel > 1} />}
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		// alignItems: 'center',
		paddingTop: '10%',
	},
	contentContainer: {
		alignItems: 'center',
		paddingHorizontal: 15,
		alignSelf: 'center',
	},
	imageBackground: {
		position: 'absolute',
		top: 0,
		alignSelf: 'center',
	},
	imageFlag: {
		width: 300,
		aspectRatio: 224 / 161,
		marginBottom: 40,
		alignSelf: 'center',
	},
	heading: {
		color: 'black',
		maxWidth: '70%',
		textAlign: 'center',
	},
	description: {
		color: 'black',
		textAlign: 'center',
		marginTop: 15,
		paddingHorizontal: 15,
	},
});
