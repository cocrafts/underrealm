import type { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { sharedStyle } from 'screens/Guide/shared';
import resources from 'utils/resources';

interface Props {
	label: string;
	icon: number;
	isFirst: boolean;
	isLast: boolean;
	onPress?: () => void;
	isSelected: boolean;
	disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ConceptButton: FC<Props> = ({
	label,
	icon,
	isFirst,
	isLast,
	onPress,
	isSelected,
}) => {
	const extraStyle = {
		marginLeft: isFirst ? 0 : 20,
		marginRight: isLast ? 0 : 20,
	};

	const animatedOpacity = useSharedValue(0.5);
	const effectOpacity = useSharedValue(0);

	const animatedContainer = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isSelected ? 1 : animatedOpacity.value),
		};
	}, [isSelected, animatedOpacity]);

	const animatedImage = useAnimatedStyle(() => {
		return {
			width: 105,
			height: 88,
			position: 'absolute',
			marginLeft: 20,
			opacity: withTiming(isSelected ? 1 : effectOpacity.value, {
				duration: 400,
			}),
		};
	}, [isSelected, effectOpacity]);

	const outlineStyle = useAnimatedStyle(() => {
		return {
			borderColor: withTiming(isSelected ? '#786442' : 'transparent'),
		};
	}, [isSelected]);

	const indicatorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: withTiming(isSelected ? '#edede8' : '#423c36'),
		};
	}, [isSelected]);

	const onHoverIn = () => {
		animatedOpacity.value = 1;
		effectOpacity.value = 1;
	};
	const onHoverOut = () => {
		animatedOpacity.value = 0.5;
		effectOpacity.value = 0;
	};

	return (
		<View>
			<AnimatedTouchable
				key={label}
				style={[styles.container, extraStyle, animatedContainer]}
				onPress={onPress}
				disabled={isSelected}
			>
				<Animated.Image
					source={resources.guide.effectOverlay}
					style={animatedImage}
				/>
				<Hoverable
					style={styles.content}
					onHoverIn={onHoverIn}
					onHoverOut={onHoverOut}
				>
					<Animated.View>
						<Image source={icon} style={styles.icon} />
						<Text style={[sharedStyle.textShadow, styles.label]}>{label}</Text>
					</Animated.View>
				</Hoverable>
			</AnimatedTouchable>
			<AnimatedTouchable
				style={[outlineStyle, styles.indicatorOutline, extraStyle]}
				onPress={onPress}
			>
				<Animated.View style={[indicatorStyle, styles.indicator]} />
			</AnimatedTouchable>
		</View>
	);
};

export default ConceptButton;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 105,
	},
	content: {
		alignItems: 'center',
	},
	icon: {
		width: 40,
		aspectRatio: 1,
	},
	label: {
		textAlign: 'center',
		color: '#FFFBDF',
	},
	indicatorOutline: {
		width: 12,
		height: 12,
		backgroundColor: 'transparent',
		borderWidth: 1,
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		transform: [
			{
				rotate: '45deg',
			},
		],
	},
	indicator: {
		width: 5,
		height: 5,
		transform: [
			{
				rotate: '90deg',
			},
		],
	},
});
