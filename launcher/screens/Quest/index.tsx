import type { FC } from 'react';
import { useMemo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import resources from 'utils/resources';
import { useSnapshot } from 'valtio';

import HeadingSection from './HeadingSection';
import QuestContent from './QuestContent';

const QuestScreen: FC = () => {
	const { windowSize, isMobile } = useSnapshot<DimensionState>(dimensionState);

	const imageHeight = useMemo(
		() => (windowSize.width * 1362) / 1440,
		[windowSize],
	);

	const imageBackgroundStyle = useMemo(() => {
		if (isMobile)
			return {
				height: imageHeight,
			};

		return {
			height: imageHeight,
			paddingTop: (imageHeight * 140) / 1024,
		};
	}, [windowSize, isMobile]);

	return (
		<ScrollLayout style={styles.container}>
			<ImageBackground
				source={resources.quest.headingBackground}
				style={[styles.imageBackground, imageBackgroundStyle]}
			>
				<HeadingSection />
				<QuestContent />
			</ImageBackground>
		</ScrollLayout>
	);
};

export default QuestScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#190E0E',
	},
	frameCharm: {
		alignSelf: 'center',
	},
	imageBackground: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 80,
	},
});
