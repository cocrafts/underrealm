import type { FC } from 'react';
import type { ScaledSize } from 'react-native';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withDecay,
	withTiming,
} from 'react-native-reanimated';
import resources from 'utils/resources';

import ClassDescription from './ClassDescription';
import ClassLogo from './ClassLogo';
import { classList } from './shared';
import SlideIndicator from './SlideIndicator';

type AnimatedContext = {
	startPosition: number;
};

interface Props {
	responsiveLevel: number;
	dimension: ScaledSize;
	classIdList: string[];
	classActive: SharedValue<string>;
}

export const ClassSummary: FC<Props> = ({
	responsiveLevel,
	dimension,
	classIdList,
	classActive,
}) => {
	const transformHorizontal = useSharedValue(0);
	const screenWidth = useSharedValue(dimension.width);

	const carouselAnimated = useAnimatedStyle(() => {
		return { transform: [{ translateX: -transformHorizontal.value }] };
	}, [transformHorizontal]);

	const onIndicatorPress = (index: number) => {
		transformHorizontal.value = withTiming(index * screenWidth.value);
		classActive.value = classIdList[index];
	};

	const gestureHandler = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		AnimatedContext
	>({
		onStart: (_, ctx) => {
			ctx.startPosition = transformHorizontal.value;
		},
		onActive: (event, ctx) => {
			transformHorizontal.value = ctx.startPosition - event.translationX;
		},
		onEnd: (event, ctx) => {
			const { velocityX } = event;
			const changeWidth = transformHorizontal.value - ctx.startPosition;
			const percentWidthChange = 0;
			let screenOrder = 0;

			// Stop swiping to the left at the first slide
			if (transformHorizontal.value < 0) {
				ctx.startPosition = 0;
			}
			// Stop swiping to the right at the last slide
			// classIdList.length - 1 = 4
			else if (transformHorizontal.value > 4 * screenWidth.value) {
				ctx.startPosition = 4 * screenWidth.value;
			}
			// Handle change slide if swipe more than 25% width of container, change back to current slide if less than 25%
			else {
				if (
					changeWidth > 0 &&
					(changeWidth / screenWidth.value) * 100 > percentWidthChange
				) {
					ctx.startPosition += screenWidth.value;
				} else if (
					changeWidth < 0 &&
					Math.abs((changeWidth / screenWidth.value) * 100) > percentWidthChange
				) {
					ctx.startPosition -= screenWidth.value;
				}
			}

			let start = 0;
			let end = 0;
			const roundPosition = (value: number) => {
				const calculatePosition = Math.round(value / screenWidth.value);
				if (calculatePosition < 0) {
					return 0;
				} else if (calculatePosition > 4) {
					return 4 * screenWidth.value;
				} else {
					return calculatePosition * screenWidth.value;
				}
			};
			if (transformHorizontal.value < ctx.startPosition) {
				start = roundPosition(transformHorizontal.value);
				end = roundPosition(ctx.startPosition);
			} else {
				start = roundPosition(ctx.startPosition);
				end = roundPosition(transformHorizontal.value);
			}
			transformHorizontal.value = withDecay({
				velocity: -velocityX,
				deceleration: 1,
				clamp: [start, end],
			});

			screenOrder = roundPosition(ctx.startPosition) / screenWidth.value;
			classActive.value = classIdList[screenOrder];
		},
	});

	if (responsiveLevel < 2) {
		return (
			<ImageBackground
				source={resources.home.classes.borderBackground}
				style={stylesDesktop.classContainer}
			>
				<Image
					source={resources.home.classes.classContentBackground}
					style={stylesDesktop.classContentBackground}
				/>
				{classList.map((item) => (
					<TouchableOpacity
						key={item.id}
						style={[
							stylesDesktop.logoContainer,
							{ left: item.position.x, top: item.position.y },
						]}
						onPress={() => (classActive.value = item.id)}
					>
						<View style={{ width: 100, height: 100 }}>
							<ClassLogo classActive={classActive} classInfo={item} />
						</View>
					</TouchableOpacity>
				))}
				<View style={stylesDesktop.classContentContainer}>
					{classList.map((item) => (
						<ClassDescription
							key={item.id}
							style={stylesDesktop.classContent}
							classActive={classActive}
							classInfo={item}
						/>
					))}
				</View>
			</ImageBackground>
		);
	}

	return (
		<View style={stylesMobile.container}>
			<PanGestureHandler onGestureEvent={gestureHandler}>
				<Animated.View
					style={[stylesMobile.carouselContainer, carouselAnimated]}
				>
					{classList.map((item) => (
						<View
							key={item.id}
							style={[stylesMobile.classContainer, { width: dimension.width }]}
						>
							<View style={stylesMobile.logoContainer}>
								<ClassLogo classInfo={item} classActive={classActive} />
							</View>
							<View style={stylesMobile.contentContainer}>
								<ClassDescription
									style={stylesMobile.classContent}
									classInfo={item}
									classActive={classActive}
								/>
							</View>
						</View>
					))}
				</Animated.View>
			</PanGestureHandler>
			<View style={stylesMobile.slideIndicatorContainer}>
				{classIdList.map((item, index) => (
					<TouchableOpacity
						key={item}
						style={{ padding: 10 }}
						onPress={() => onIndicatorPress(index)}
					>
						<SlideIndicator classId={item} classActive={classActive} />
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default ClassSummary;

const stylesDesktop = StyleSheet.create({
	classContainer: {
		width: 560,
		height: 426,
		marginVertical: 20,
		paddingVertical: 100,
		paddingHorizontal: 80,
		justifyContent: 'center',
	},
	logoContainer: {
		width: 100,
		height: 100,
		position: 'absolute',
	},
	classContentBackground: {
		position: 'absolute',
		top: 60,
		left: 70,
		width: 425,
		height: 310,
	},
	classContentContainer: {
		flex: 1,
		alignItems: 'center',
	},
	classContent: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	},
	slideIndicatorContainer: {
		width: '100%',
		marginTop: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

const stylesMobile = StyleSheet.create({
	container: {
		marginVertical: 20,
		width: '100%',
	},
	carouselContainer: {
		flexDirection: 'row',
	},
	classContainer: {
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	logoContainer: {
		width: 100,
		height: 100,
		marginBottom: 15,
	},
	contentContainer: {
		width: '100%',
	},
	classContent: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	slideIndicatorContainer: {
		width: '100%',
		marginTop: 20,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
