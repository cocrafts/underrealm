import type { FC } from 'react';
import { useRef } from 'react';
import type { NativeScrollEvent } from 'react-native';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated';
import type { DimensionState } from '@metacraft/ui';
import { dimensionState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import { navigationHeight } from 'components/Navigation/shared';
import Elemental from 'screens/Guide/Dashboard/Elemental';
import PlayingUnderRealm from 'screens/Guide/Dashboard/PlayingUnderRealm';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import BattlefieldOverview from './BattlefieldOverview';
import Cards from './Cards';
import Footer from './Footer';
import Header from './Header';

const GuideDashboard: FC = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.wideContainer.maxWidth);
	const mainBgTop = useSharedValue<number>(0);

	const scrollOffset = useSharedValue(0);
	const battlefieldRef = useRef<number | null>(null);
	const playRef = useRef<number | null>(null);
	const cardRef = useRef<number | null>(null);
	const scrollRef = useRef<Animated.ScrollView>(null);

	const translate = useDerivedValue(() => {
		return scrollOffset.value >= mainBgTop.value
			? -mainBgTop.value
			: -scrollOffset.value;
	});

	const onScroll = (e: NativeScrollEvent) => {
		scrollOffset.value = e.contentOffset.y;
	};

	const animatedImage = useAnimatedStyle(() => {
		return {
			width,
			height: (width * 576) / 864,
			alignItems: 'center',
			position: 'absolute',
			backgroundColor: 'black',
			top: mainBgTop.value,
			transform: [{ translateY: translate.value }],
		};
	}, [width, mainBgTop, translate]);

	const onPress = (index: number) => {
		if (index === 0)
			scrollRef?.current?.scrollTo(battlefieldRef?.current || 0, 0, true);
		if (index === 1)
			scrollRef?.current?.scrollTo(playRef?.current || 0, 0, true);
		if (index === 2)
			scrollRef?.current?.scrollTo(cardRef?.current || 0, 0, true);
	};

	const viewWidth = responsiveLevel > 1 ? '100%' : '60%';

	return (
		<View style={[styles.container, iStyles.wideContainer]}>
			<Animated.View style={animatedImage}>
				<Image
					source={resources.guide.mainBackground}
					resizeMode="contain"
					style={{ width: '100%', height: '100%' }}
				/>
			</Animated.View>
			<ScrollLayout scrollRef={scrollRef} onScroll={onScroll}>
				<View style={{ width: viewWidth, alignSelf: 'center' }}>
					<Header onPress={onPress} />
					<View
						onLayout={(e) => {
							mainBgTop.value =
								e.nativeEvent.layout.y +
								navigationHeight.local +
								navigationHeight.storm;
							battlefieldRef.current = e.nativeEvent.layout.y;
						}}
					>
						<BattlefieldOverview />
					</View>
					<View onLayout={(e) => (playRef.current = e.nativeEvent.layout.y)}>
						<PlayingUnderRealm />
					</View>
					<View onLayout={(e) => (cardRef.current = e.nativeEvent.layout.y)}>
						<Cards />
					</View>
					<Elemental />
					<Footer />
				</View>
			</ScrollLayout>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});

export default GuideDashboard;
