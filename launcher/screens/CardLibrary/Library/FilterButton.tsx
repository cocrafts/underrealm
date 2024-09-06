import type React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface Props {
	isActive: boolean;
	onPress: () => void;
	numberOfFilters: number;
}

const AnimatedImageBackground =
	Animated.createAnimatedComponent(ImageBackground);

const FilterButton: React.FC<Props> = ({
	isActive,
	onPress,
	numberOfFilters,
}) => {
	const animatedBgStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isActive ? 1 : 0.5),
		};
	}, [isActive]);

	const bgSource = isActive
		? resources.cardLibrary.activeFilterButton
		: resources.cardLibrary.normalFilterButton;

	const iconSource = isActive
		? resources.cardLibrary.activeFilterIcon
		: resources.cardLibrary.normalFilterIcon;

	return (
		<TouchableOpacity onPress={onPress} disabled={!isActive}>
			<AnimatedImageBackground
				style={[styles.container, animatedBgStyle]}
				resizeMode="stretch"
				source={bgSource}
			>
				<Image style={styles.icon} source={iconSource} />
				<Text
					style={{ ...styles.label, color: !isActive ? '#6d645f' : '#d4bc78' }}
				>
					Filters
				</Text>
			</AnimatedImageBackground>
			{numberOfFilters > 0 && (
				<View style={styles.numberOfFilters}>
					<Text responsiveSizes={[17]}>{numberOfFilters}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

export default FilterButton;

const styles = StyleSheet.create({
	container: {
		width: 172,
		height: 55,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 14,
		height: 14,
		marginRight: 8,
	},
	label: {
		fontWeight: '500',
	},
	numberOfFilters: {
		position: 'absolute',
		backgroundColor: '#0c2423',
		borderRadius: 8,
		width: 30,
		height: 30,
		right: -5,
		top: -5,
		borderColor: '#3e5056',
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	numberLabel: {
		fontFamily: 'Volkhov',
		fontWeight: 'bold',
	},
});
