import type { ViewStyle } from 'react-native';
import type { AnimatedStyle, SharedValue } from 'react-native-reanimated';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type HoveredStyleFunc = (
	isHovered: SharedValue<boolean>,
) => AnimatedStyle<ViewStyle>;

export const useDefaultHoveredStyle: HoveredStyleFunc = (isHovered) =>
	useAnimatedStyle(() => {
		return {
			opacity: withTiming(isHovered.value ? 0 : 1, { duration: 250 }),
		};
	}, [isHovered]);
