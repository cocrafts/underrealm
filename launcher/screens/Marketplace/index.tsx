import type { FC } from 'react';
import type { LayoutRectangle } from 'react-native';
import { View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import type { AppState } from '@metacraft/ui';
import { appState } from '@metacraft/ui';
import CompactLayout from 'components/layouts/Compact';
import { idleLayout } from 'utils/helper';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import BoxSellingSection from './sections/BoxSelling';
import HeadingSection from './sections/Heading';

const BrowserMarketplace: FC = () => {
	const headingLayout = useSharedValue<LayoutRectangle>(idleLayout);
	const scrollOffset = useSharedValue(0);
	const contentOffsetVertical = useSharedValue(0);
	const { windowDimensions } = useSnapshot<AppState>(appState);
	const scaledWidth = Math.min(
		windowDimensions.width,
		iStyles.contentContainer.maxWidth,
	);

	const scrollHandler = useAnimatedScrollHandler(
		{
			onScroll: ({ contentOffset }) => {
				contentOffsetVertical.value = contentOffset.y;
				if (contentOffset.y < headingLayout.value.height) {
					scrollOffset.value = headingLayout.value.height - contentOffset.y;
				} else {
					scrollOffset.value = 0;
				}
			},
		},
		[headingLayout, scrollOffset.value],
	);

	const backgroundStyle = useAnimatedStyle(() => {
		return {
			opacity: 0.5,
			width: scaledWidth,
			height: windowDimensions.height,
			position: 'absolute',
			transform: [{ translateY: scrollOffset.value }],
		};
	}, [scaledWidth, windowDimensions.height, scrollOffset]);

	return (
		<CompactLayout>
			<View style={iStyles.contentContainer}>
				<View
					style={{
						position: 'absolute',
						width: scaledWidth,
						height: windowDimensions.height,
						backgroundColor: '#150101',
					}}
				/>
				<Animated.Image
					source={resources.marketplace.mainBackground}
					style={backgroundStyle}
				/>
			</View>

			<Animated.ScrollView
				contentContainerStyle={iStyles.contentContainer}
				onScroll={scrollHandler}
				scrollEventThrottle={10}
				showsVerticalScrollIndicator={false}
			>
				<HeadingSection
					onLayout={({ nativeEvent }) => {
						headingLayout.value = nativeEvent.layout;
						scrollOffset.value = Math.max(
							nativeEvent.layout.height - contentOffsetVertical.value,
							0,
						);
					}}
				/>
				<BoxSellingSection />
			</Animated.ScrollView>
		</CompactLayout>
	);
};

export default BrowserMarketplace;
