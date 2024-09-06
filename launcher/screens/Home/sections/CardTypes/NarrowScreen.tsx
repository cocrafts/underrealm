import type { FC } from 'react';
import { useState } from 'react';
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

export const NarrowScreen: FC = () => {
	const currentSelectCardType = useSharedValue(0);
	const [contentHeight, setContentHeight] = useState(0);

	const firstCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		return { opacity: currentSelectCardType.value !== 0 ? 0.5 : 1 };
	}, [currentSelectCardType]);

	const secondCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 1 ? 0.5 : 1,
		};
	}, [currentSelectCardType]);

	const thirdCardTypeTitleAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 2 ? 0.5 : 1,
		};
	}, [currentSelectCardType]);

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

	const firstCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 0 ? 0 : 1,
		};
	}, [currentSelectCardType]);

	const secondCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 1 ? 0 : 1,
		};
	}, [currentSelectCardType]);

	const thirdCardTypeContentAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: currentSelectCardType.value !== 2 ? 0 : 1,
		};
	}, [currentSelectCardType]);

	const cardTypeContentAnimatedStyleList = [
		firstCardTypeContentAnimatedStyle,
		secondCardTypeContentAnimatedStyle,
		thirdCardTypeContentAnimatedStyle,
	];

	const getContentHeight = (height: number) => {
		if (height > contentHeight) {
			setContentHeight(height);
		}
	};

	return (
		<ImageBackground
			source={resources.home.cardTypesBackground}
			style={styles.container}
		>
			<Text
				style={[sharedStyle.heading, styles.heading]}
				responsiveSizes={headingSize}
			>
				Know Your Army
			</Text>
			<View style={styles.titleContainer}>
				{cardTypeList.map((item, index) => (
					<AnimatedTouchable
						key={index}
						style={[styles.titleItem, cardTypeTitleAnimatedStyleList[index]]}
						onPress={() => (currentSelectCardType.value = index)}
					>
						<Text style={styles.title}>{item.title}</Text>
					</AnimatedTouchable>
				))}
			</View>
			<View style={styles.visualContainer}>
				{cardTypeList.map((item, index) => (
					<AnimatedView
						key={index}
						style={[styles.visual, cardTypeVisualAnimatedStyleList[index]]}
					>
						<Image
							source={item.image}
							resizeMode={index === 0 ? 'cover' : 'contain'}
							style={{ width: 300, height: 300 }}
						/>
					</AnimatedView>
				))}
			</View>
			<View style={{ height: contentHeight, width: '100%' }}>
				{cardTypeList.map((item, index) => (
					<AnimatedView
						key={index}
						style={[
							styles.contentContainer,
							cardTypeContentAnimatedStyleList[index],
						]}
						onLayout={({ nativeEvent: { layout } }) => {
							getContentHeight(layout.height);
						}}
					>
						{item.content.map((content, index) => (
							<Text key={index} style={styles.content}>
								{content}
							</Text>
						))}
					</AnimatedView>
				))}
			</View>
		</ImageBackground>
	);
};

export default NarrowScreen;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 40,
	},
	heading: {
		fontFamily: 'Volkhov',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 20,
	},
	titleItem: {
		marginHorizontal: 10,
	},
	title: {
		fontFamily: 'Volkhov',
		fontSize: 20,
		color: '#fff',
	},
	visualContainer: {
		alignItems: 'center',
		width: 300,
		height: 300,
	},
	visual: {
		position: 'absolute',
		top: 0,
		left: 0,
	},
	contentContainer: {
		paddingHorizontal: 15,
		paddingVertical: 20,
		position: 'absolute',
		top: 0,
	},
	content: {
		marginBottom: 20,
		color: '#fff',
	},
});
