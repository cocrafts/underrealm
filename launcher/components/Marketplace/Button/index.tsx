import type { FC, ReactNode } from 'react';
import { Fragment, useState } from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';

import { idleLayout } from '../../../utils/helper';
import resources from '../../../utils/resources';

import type { HoveredStyleFunc } from './shared';
import { useDefaultHoveredStyle } from './shared';

interface Props {
	style?: ViewStyle;
	disabled?: boolean;
	title?: string;
	texStyle?: TextStyle;
	children?: ReactNode;
	isSubButton?: boolean;
	onPress?: () => void;
	useHoveredStyle?: HoveredStyleFunc;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const UnderRealmButton: FC<Props> = ({
	style,
	disabled = false,
	title = '',
	texStyle,
	children,
	isSubButton = false,
	onPress,
	useHoveredStyle = useDefaultHoveredStyle,
}) => {
	const [layout, setLayout] = useState(idleLayout);
	const source = isSubButton
		? resources.marketplace.underRealmSubButton
		: resources.marketplace.underRealmButton;

	const middle = {
		position: 'absolute',
		top: 0,
		left: 5,
		right: 5,
		height: layout.height,
	} as ImageStyle;

	const edge = {
		position: 'absolute',
		top: 0,
		height: layout.height,
		width: layout.height,
	};

	const left = {
		...edge,
		left: 0,
	} as ImageStyle;

	const right = {
		...edge,
		right: 0,
	} as ImageStyle;

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[styles.container, style]}
			onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}
			onPress={onPress}
			disabled={disabled}
		>
			{layout.width && (
				<Fragment>
					<Fragment>
						<Image
							style={middle}
							source={source.hover.middle}
							resizeMode="repeat"
						/>
						<Image style={left} source={source.hover.left} />
						<Image style={right} source={source.hover.right} />
					</Fragment>
				</Fragment>
			)}
			<View>
				{children || <Text style={[styles.titleStyle, texStyle]}>{title}</Text>}
			</View>
			<Hoverable
				style={{ ...middle, left: 0, right: 0, justifyContent: 'center' }}
				animatedStyle={useHoveredStyle}
			>
				<AnimatedView>
					<Image
						style={middle}
						source={source.normal.middle}
						resizeMode="repeat"
					/>
					<Image style={left} source={source.normal.left} />
					<Image style={right} source={source.normal.right} />
					<View>
						{children || (
							<Text style={[styles.titleStyle, texStyle]}>{title}</Text>
						)}
					</View>
				</AnimatedView>
			</Hoverable>
		</TouchableOpacity>
	);
};

export default UnderRealmButton;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 10,
	},
	titleStyle: {
		textAlign: 'center',
		color: '#fff',
	},
});
