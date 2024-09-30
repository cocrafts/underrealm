import type { FC, RefAttributes } from 'react';
import { useState } from 'react';
import type { PressableProps, StyleProp, View, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';

type Props = PressableProps &
	RefAttributes<View> & {
		hoverStyle?: StyleProp<ViewStyle>;
	};

export const HoverableButton: FC<Props> = ({ style, hoverStyle, ...props }) => {
	const [isHovered, setIsHovered] = useState(false);

	const wrappedStyle =
		typeof style === 'function'
			? (state) => [style(state), isHovered && hoverStyle]
			: [style, isHovered && hoverStyle];

	return (
		<Pressable
			style={wrappedStyle}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			{...props}
		/>
	);
};

export default HoverableButton;
