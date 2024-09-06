import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const ShapesIcon: FC<Props> = ({ style, size, color }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			stroke={color}
			strokeWidth={32}
			strokeLinecap="round"
			strokeLinejoin="round"
			viewBox="0 0 512 512"
		>
			<Path d="M336 320H32L184 48l152 272zM265.32 194.51A144 144 0 11192 320" />
		</Svg>
	);
};

ShapesIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default ShapesIcon;
