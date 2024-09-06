import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

interface Props {
	classId: string;
	classActive: SharedValue<string>;
}

const SlideIndicator: FC<Props> = ({ classId, classActive }) => {
	const indicatorAnimated = useAnimatedStyle(() => {
		const isActive = classActive.value === classId;
		return { opacity: withTiming(isActive ? 1 : 0) };
	}, [classActive, classId]);

	return (
		<View style={styles.container}>
			<View style={styles.inactiveIndicatorContainer}>
				<View style={styles.inactiveIndicator} />
			</View>
			<Animated.View style={[styles.activeIndicatorBorder, indicatorAnimated]}>
				<View style={styles.activeIndicator} />
			</Animated.View>
		</View>
	);
};

export default SlideIndicator;

const styles = StyleSheet.create({
	container: {
		width: 16,
		height: 16,
	},
	inactiveIndicatorContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.7,
	},
	inactiveIndicator: {
		width: 8,
		height: 8,
		borderRadius: 8,
		backgroundColor: '#fff',
	},
	activeIndicatorBorder: {
		width: 16,
		height: 16,
		borderRadius: 16,
		borderColor: '#fff',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeIndicator: {
		width: 8,
		height: 8,
		borderRadius: 8,
		backgroundColor: '#fff',
	},
});
