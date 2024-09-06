import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import type { LayoutRectangle, TextStyle } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';
import { idleLayout } from 'launcher/utils/helper';
import resources from 'launcher/utils/resources';

interface Props {
	title?: string | ReactNode;
	content?: string;
	children?: string | ReactNode;
	titleStyle?: TextStyle;
	chevronImage?: ReactNode;
	defaultExpanded?: boolean;
}

export const Accordion: FC<Props> = ({
	title,
	content,
	children,
	titleStyle,
	chevronImage,
	defaultExpanded = false,
}) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);
	const titleIsString = typeof title === 'string';
	const chevronAngle = useSharedValue(isExpanded ? 180 : 0);
	const contentHeight = useSharedValue(0);
	const [titleLayout, setTitleLayout] = useState<LayoutRectangle>(idleLayout);
	const [contentLayout, setContentLayout] =
		useState<LayoutRectangle>(idleLayout);

	const animatedChevronStyle = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: withTiming(-chevronAngle.value + 'deg') }],
		};
	}, [chevronAngle]);

	const animatedHeightStyle = useAnimatedStyle(() => {
		return {
			height: withTiming(contentHeight.value),
		};
	}, [contentHeight]);

	return (
		<Animated.View style={[styles.container, animatedHeightStyle]}>
			<TouchableOpacity
				onLayout={({ nativeEvent }) => {
					setTitleLayout(nativeEvent.layout);
					contentHeight.value = nativeEvent.layout.height;
				}}
				style={styles.titleContainer}
				onPress={() => {
					setIsExpanded(!isExpanded);
					chevronAngle.value = isExpanded ? 0 : 180;
					contentHeight.value = !isExpanded
						? titleLayout?.height + contentLayout?.height
						: titleLayout?.height;
				}}
			>
				{titleIsString ? (
					<Text style={[styles.titleText, titleStyle]}>
						{title || 'Title is missing'}
					</Text>
				) : (
					<View style={styles.titleText}>{title}</View>
				)}
				<Animated.View style={[styles.chevronContainer, animatedChevronStyle]}>
					{chevronImage || (
						<Image
							source={resources.marketplace.chevronDown}
							style={{ width: 19, height: 10 }}
						/>
					)}
				</Animated.View>
			</TouchableOpacity>
			<View
				onLayout={({ nativeEvent }) => {
					setContentLayout(nativeEvent.layout);
					contentHeight.value = isExpanded
						? contentHeight.value + nativeEvent.layout.height
						: contentHeight.value;
				}}
			>
				{children || <Text style={styles.contentText}>{content}</Text>}
			</View>
		</Animated.View>
	);
};

export default Accordion;

const styles = StyleSheet.create({
	container: {
		overflow: 'hidden',
	},
	titleContainer: {
		flexDirection: 'row',
	},
	titleText: {
		flex: 1,
	},
	chevronContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentText: {
		textAlign: 'justify',
	},
});
