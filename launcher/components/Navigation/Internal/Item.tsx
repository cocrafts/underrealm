import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { useNavigation } from '@react-navigation/native';
import resources from 'utils/resources';

import type { NavigationConfig } from '../shared';
import { navigationHeight } from '../shared';

interface Props {
	item: NavigationConfig;
	onNavigate?: (item: NavigationConfig) => void;
}

export const NavigationItem: FC<Props> = ({ item, onNavigate }) => {
	const navigation = useNavigation();
	const getRouteName = () => {
		const routeState =
			navigation.getParent()?.getState() || navigation.getState();
		const name = routeState?.routes[routeState.index].name || null;
		return name;
	};
	const isActive = item.route === getRouteName();
	const isHovered = useSharedValue(false);
	const imageAnimated = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isActive || isHovered.value ? 1 : 0),
			transform: [{ scale: withTiming(isActive || isHovered.value ? 1 : 0.5) }],
		};
	}, [isActive, isHovered]);

	return (
		<Hoverable
			style={styles.container}
			onHoverIn={() => {
				isHovered.value = true;
			}}
			onHoverOut={() => {
				isHovered.value = false;
			}}
		>
			<TouchableOpacity onPress={() => onNavigate?.(item)}>
				<Animated.Image
					source={resources.navigation.highlightVisual}
					style={[styles.highlightImage, imageAnimated]}
				/>
				<View>
					<Text style={styles.title}>{item.title}</Text>
				</View>
			</TouchableOpacity>
		</Hoverable>
	);
};

export default NavigationItem;

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: navigationHeight.local,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: '#cdc8b5',
	},
	highlightImage: {
		width: '100%',
		aspectRatio: 97 / 33,
		position: 'absolute',
		left: 0,
	},
});
