import type React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import type { CardTypeProps } from 'screens/CardLibrary/Library/shared';
import resources from 'utils/resources';

interface Props {
	isSelected: boolean;
	type: CardTypeProps;
	onPress: () => void;
}
const CardTypeButton: React.FC<Props> = ({ isSelected, onPress, type }) => {
	const animatedOpacity = useSharedValue(0);
	const animatedEffectStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isSelected ? 1 : animatedOpacity.value),
		};
	}, [isSelected, animatedOpacity]);

	const onHoverIn = () => (animatedOpacity.value = 1);

	const onHoverOut = () => (animatedOpacity.value = 0);

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<Hoverable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
				<Animated.View>
					<View>
						<Animated.Image
							source={resources.cardLibrary.effectSelectType}
							style={[animatedEffectStyle, styles.effect]}
						/>

						<Image
							source={type.image}
							style={styles.image}
							resizeMode="contain"
						/>
					</View>

					<Text style={isSelected ? styles.focusLabel : styles.label}>
						{type.label}
					</Text>
				</Animated.View>
			</Hoverable>
		</TouchableOpacity>
	);
};

export default CardTypeButton;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		alignItems: 'center',
	},
	effect: {
		position: 'absolute',
		width: 100,
		aspectRatio: 106 / 94,
		top: -10,
		left: -20,
	},
	image: {
		width: 66,
		height: 66,
	},
	focusLabel: {
		textShadow: '0 0 10px #8D8767',
		color: '#fff',
		textAlign: 'center',
	},
	label: {
		color: '#fff',
		textAlign: 'center',
	},
});
