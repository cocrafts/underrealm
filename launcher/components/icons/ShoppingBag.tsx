import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Line, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const ShoppingBagIcon: FC<Props> = ({ style, size, color }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			stroke={color}
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 24 24"
		>
			<Path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
			<Line x1="3" y1="6" x2="21" y2="6" />
			<Path d="M16 10a4 4 0 0 1-8 0" />
		</Svg>
	);
};

ShoppingBagIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default ShoppingBagIcon;
