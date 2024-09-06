import type { FC, ReactNode, RefObject } from 'react';
import type { NativeScrollEvent, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from 'react-native-reanimated';
import { dimensionState } from '@metacraft/ui';
import InternalNavigation from 'components/Navigation/Internal';
import { navigationHeight } from 'components/Navigation/shared';
import { useSnapshot } from 'utils/hook';

const FIXED_HEADER_HEIGHT = 68;
interface Props {
	children?: ReactNode;
	style?: ViewStyle | ViewStyle[];
	contentContainerStyle?: ViewStyle | ViewStyle[];
	onScroll?: (event: NativeScrollEvent) => void;
	scrollRef?: RefObject<Animated.ScrollView>;
}

export const ScrollLayout: FC<Props> = ({
	children,
	style,
	contentContainerStyle,
	onScroll,
	scrollRef,
}) => {
	const { isMobile } = useSnapshot(dimensionState);
	const scrollOffset = useSharedValue(0);
	const translate = useDerivedValue(() => {
		if (isMobile) return 0;
		return scrollOffset.value > navigationHeight.storm
			? navigationHeight.storm
			: scrollOffset.value;
	});
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollOffset.value = event.contentOffset.y;
			onScroll?.(event);
		},
	});

	const contentContainer = {};

	const containerStyle = {
		paddingTop: isMobile ? 0 : FIXED_HEADER_HEIGHT,
	};

	const navigationStyle = useAnimatedStyle(() => {
		return {
			zIndex: 1,
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			transform: [{ translateY: -translate.value }],
		};
	}, [translate]);

	return (
		<View style={[styles.container, containerStyle, style]}>
			<Animated.View style={navigationStyle}>
				{/* {!isMobile && <StormNavigation />} */}
				<InternalNavigation isMobile={isMobile} />
			</Animated.View>
			<Animated.ScrollView
				ref={scrollRef}
				style={[contentContainer, contentContainerStyle]}
				onScroll={scrollHandler}
				scrollEventThrottle={5}
			>
				{children}
			</Animated.ScrollView>
		</View>
	);
};

export default ScrollLayout;

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
