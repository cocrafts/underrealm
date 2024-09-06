import type { FC, MouseEvent } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable } from '@metacraft/ui';

import resources from '../../../utils/resources';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

export interface CardProps {
	style?: ViewStyle;
	imageSource?: string;
	size?: number;
	ratio?: number;
	animationFlipDisable?: boolean;
	animationHoveredDisable?: boolean;
	isCardUp?: boolean;
	onPress?: () => void;
}

const Card: FC<CardProps> = ({
	style,
	imageSource,
	size = 200,
	ratio = 1.45,
	animationFlipDisable = false,
	animationHoveredDisable = false,
	isCardUp = true,
	onPress,
}) => {
	const cardResources = resources.marketplace.card;
	const width = size;
	const height = size * ratio;
	const cardSize = { width, height };
	const xOffset = useSharedValue(width / 2);
	const yOffset = useSharedValue(height / 2);
	const xFlipOffset = useSharedValue(0);
	const isUp = useSharedValue(isCardUp);

	const onMouseMove = ({ nativeEvent }: MouseEvent) => {
		xOffset.value = nativeEvent.offsetX;
		yOffset.value = nativeEvent.offsetY;
	};

	const onHoverOut = () => {
		xOffset.value = withTiming(width / 2);
		yOffset.value = withTiming(height / 2);
	};

	const useHoveredStyle = (isHovered: SharedValue<boolean>) => {
		return useAnimatedStyle(() => {
			if (animationHoveredDisable) {
				return {} as ViewStyle;
			}

			const scale = withSpring(isHovered.value ? 1.08 : 1);
			const rotateY = interpolate(
				xOffset.value,
				[0, width / 2, width],
				[10, 0, -10],
			);
			const rotateX = interpolate(
				yOffset.value,
				[0, height / 2, height],
				[-10, 0, 10],
			);

			return {
				transform: [
					{ perspective: 1000 },
					{ scale },
					{ rotateY: `${rotateY}deg` },
					{ rotateX: `${rotateX}deg` },
				],
			};
		}, [isHovered, yOffset, width, height]);
	};

	const useFlipBackStyle = (isUp: SharedValue<boolean>) => {
		return useAnimatedStyle(() => {
			if (animationFlipDisable) {
				return { opacity: isUp.value ? 1 : 0 } as ViewStyle;
			}

			const rotateY = isUp.value
				? interpolate(xFlipOffset.value, [0, width], [0, 180])
				: interpolate(xFlipOffset.value, [width, 0], [180, 0]);

			const opacity = interpolate(
				xFlipOffset.value,
				[width / 2 - 1, width / 2],
				[1, 0],
			);

			return {
				backfaceVisibility: 'hidden',
				transform: [{ rotateY: `${rotateY}deg` }],
				opacity,
			};
		}, [isUp, xFlipOffset, width]);
	};

	const useFlipFrontStyle = (isUp: SharedValue<boolean>) => {
		return useAnimatedStyle(() => {
			if (animationFlipDisable) {
				return { opacity: isUp.value ? 0 : 1 } as ViewStyle;
			}

			const rotateY = isUp.value
				? interpolate(xFlipOffset.value, [width, 0], [360, 180])
				: interpolate(xFlipOffset.value, [0, width], [180, 360]);

			const opacity = interpolate(
				xFlipOffset.value,
				[width / 2 - 1, width / 2],
				[0, 1],
			);

			return {
				backfaceVisibility: 'hidden',
				transform: [{ rotateY: `${rotateY}deg` }],
				opacity,
			};
		}, [isUp, xFlipOffset, width]);
	};

	return (
		<Hoverable
			style={[styles.container, style, cardSize]}
			onMouseMove={onMouseMove}
			onHoverOut={onHoverOut}
			animatedStyle={useHoveredStyle}
		>
			<AnimatedTouchable
				onPress={() => {
					if (!animationFlipDisable) {
						isUp.value = !isUp.value;
						xFlipOffset.value = withTiming(isUp.value ? 0 : width, {
							duration: 1000,
						});
					}
					onPress?.();
				}}
			>
				<AnimatedView style={[useFlipBackStyle(isUp)]}>
					<Image source={cardResources.back} style={[cardSize]} />
				</AnimatedView>
				<AnimatedView
					style={[
						cardSize,
						{
							position: 'absolute',
							top: 0,
						},
						useFlipFrontStyle(isUp),
					]}
				>
					{imageSource ? (
						<Image style={cardSize} source={{ uri: imageSource }} />
					) : (
						<Image style={cardSize} source={resources.marketplace.card.front} />
					)}
				</AnimatedView>
			</AnimatedTouchable>
		</Hoverable>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {},
});
