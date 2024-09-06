import type { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';

import { sharedStyle, useHoveredStyle } from '../shared';

interface ButtonBannerProps {
	isActive: boolean;
	onPress: () => void;
	label: string;
	activeIcon: number;
	icon: number;
}
const ButtonBanner: FC<ButtonBannerProps> = ({
	isActive,
	onPress,
	label,
	activeIcon,
	icon,
}) => {
	const outlineStyle = useAnimatedStyle(() => {
		return {
			borderColor: withTiming(isActive ? '#786442' : 'transparent'),
		};
	}, [isActive]);

	const indicatorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(isActive ? '#edede8' : '#423c36'),
		};
	}, [isActive]);

	return (
		<View>
			<TouchableOpacity
				style={styles.button}
				onPress={onPress}
				disabled={isActive}
			>
				<Hoverable animatedStyle={useHoveredStyle}>
					<Animated.View>
						<Image
							source={isActive ? activeIcon : icon}
							style={styles.buttonIcon}
							resizeMode="contain"
						/>
						<Text
							style={[
								{
									opacity: isActive ? 1 : 0.5,
								},
								styles.buttonText,
								sharedStyle.textShadow,
							]}
						>
							{label}
						</Text>
					</Animated.View>
				</Hoverable>
			</TouchableOpacity>
			<Animated.View style={[styles.indicatorOutline, outlineStyle]}>
				<Animated.View style={[styles.indicator, indicatorStyle]} />
			</Animated.View>
		</View>
	);
};

export default ButtonBanner;

const styles = StyleSheet.create({
	button: {
		marginHorizontal: 40,
		alignItems: 'center',
		overflow: 'visible',
	},
	buttonIcon: {
		width: 52,
		aspectRatio: 1,
		alignSelf: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFBDF',
	},
	indicatorOutline: {
		width: 12,
		height: 12,
		backgroundColor: 'transparent',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 18,
		marginVertical: 2,
		transform: [
			{
				rotate: '45deg',
			},
		],
		zIndex: 100,
	},
	indicator: {
		width: 6,
		height: 6,
		backgroundColor: '#423c36',
		alignSelf: 'center',
	},
});
