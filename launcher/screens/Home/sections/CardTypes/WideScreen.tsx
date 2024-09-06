import type { FC } from 'react';
import { Fragment } from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import resources from 'utils/resources';

import { cardTypeList } from './shared';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const WideScreen: FC = () => {
	const currentSelectCardType = useSharedValue(0);
	const firstContentHeight = useSharedValue(0);
	const secondContentHeight = useSharedValue(0);
	const thirdContentHeight = useSharedValue(0);
	const contentHeights = [
		firstContentHeight,
		secondContentHeight,
		thirdContentHeight,
	];

	const firstCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 0 ? 0 : 1,
			transform: [{ translateY: 50 }],
		};
	}, [currentSelectCardType]);

	const secondCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 1 ? 0 : 1,
			transform: [{ translateY: 100 }],
		};
	}, [currentSelectCardType]);

	const thirdCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 2 ? 0 : 1,
			transform: [{ translateY: 150 }],
		};
	}, [currentSelectCardType]);

	const cardTypeContentAnimatedStyleList = [
		firstCardTypeContentAnimatedStyle,
		secondCardTypeContentAnimatedStyle,
		thirdCardTypeContentAnimatedStyle,
	];

	const firstCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: currentSelectCardType.value !== 0 ? 0.5 : 1 };
	}, [currentSelectCardType]);

	const secondCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		const firstHeight = contentHeights[0].value || 0;
		const contentSpace = currentSelectCardType.value === 0 ? firstHeight : 0;
		return {
			opacity: currentSelectCardType.value !== 1 ? 0.5 : 1,
			transform: [{ translateY: 50 + contentSpace }],
		};
	}, [contentHeights, currentSelectCardType]);

	const thirdCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		const contentSpace =
			currentSelectCardType.value !== 2
				? contentHeights[currentSelectCardType.value].value
				: 0;
		return {
			opacity: currentSelectCardType.value !== 2 ? 0.5 : 1,
			transform: [{ translateY: 100 + contentSpace }],
		};
	}, [currentSelectCardType, contentHeights]);

	const cardTypeTitleAnimatedStyleList = [
		firstCardTypeTitleAnimatedStyle,
		secondCardTypeTitleAnimatedStyle,
		thirdCardTypeTitleAnimatedStyle,
	];

	const firstCardTypeVisualAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: withTiming(currentSelectCardType.value !== 0 ? 0 : 1) };
	}, [currentSelectCardType]);

	const secondCardTypeVisualAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: withTiming(currentSelectCardType.value !== 1 ? 0 : 1) };
	}, [currentSelectCardType]);

	const thirdCardTypeVisualAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: withTiming(currentSelectCardType.value !== 2 ? 0 : 1) };
	}, [currentSelectCardType]);

	const cardTypeVisualAnimatedStyleList = [
		firstCardTypeVisualAnimatedStyle,
		secondCardTypeVisualAnimatedStyle,
		thirdCardTypeVisualAnimatedStyle,
	];

	return (
		<ImageBackground
			style={styles.container}
			source={resources.home.cardTypesBackground}
		>
			<Text
				style={[sharedStyle.heading, styles.heading]}
				responsiveSizes={headingSize}
			>
				Know Your Army
			</Text>
			<View style={styles.contentContainer}>
				<View style={styles.leftContainer}>
					<View style={styles.innerLeftContainer}>
						<Fragment>
							{cardTypeList.map((item, index) => (
								<AnimatedView
									key={index}
									style={[
										styles.contentTitleContainer,
										cardTypeContentAnimatedStyleList[index],
									]}
									onLayout={({ nativeEvent }) => {
										contentHeights[index].value = nativeEvent.layout.height;
									}}
								>
									{item.content.map((content, index) => (
										<Text key={index} style={styles.content}>
											{content}
										</Text>
									))}
								</AnimatedView>
							))}
						</Fragment>

						<Fragment>
							{cardTypeList.map((item, index) => (
								<AnimatedTouchable
									key={index}
									style={[
										styles.contentTitleContainer,
										cardTypeTitleAnimatedStyleList[index],
									]}
									onPress={() => (currentSelectCardType.value = index)}
								>
									<Text style={styles.title}>{item.title}</Text>
								</AnimatedTouchable>
							))}
						</Fragment>
					</View>
				</View>
				<View style={styles.rightContainer}>
					<View style={styles.visualContainer}>
						{cardTypeList.map((item, index) => (
							<AnimatedView
								key={index}
								style={[
									styles.visualImage,
									cardTypeVisualAnimatedStyleList[index],
								]}
							>
								<Image
									source={item.image}
									resizeMode={index === 0 ? 'cover' : 'contain'}
									style={{ width: 600, height: 600 }}
								/>
							</AnimatedView>
						))}
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default WideScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: 40,
	},
	heading: {
		fontFamily: 'Volkhov',
	},
	contentContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	leftContainer: {
		flex: 1,
		paddingVertical: 40,
		alignItems: 'center',
	},
	innerLeftContainer: {
		width: 400,
	},
	contentTitleContainer: {
		position: 'absolute',
		top: 0,
	},
	title: {
		fontFamily: 'Volkhov',
		fontSize: 25,
		color: '#fff',
	},
	content: {
		marginBottom: 20,
		color: '#fff',
	},
	rightContainer: {
		flex: 1,
		alignItems: 'center',
	},
	visualContainer: {
		width: 600,
		height: 600,
	},
	visualImage: {
		position: 'absolute',
		bottom: 0,
	},
});
