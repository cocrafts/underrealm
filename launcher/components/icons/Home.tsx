import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Polyline, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const HomeIcon: FC<Props> = ({ style, size, color }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			stroke={color}
			strokeWidth={2}
			viewBox="0 0 24 24"
		>
			<Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<Polyline points="9 22 9 12 15 12 15 22" />
		</Svg>
	);
};

HomeIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default HomeIcon;
