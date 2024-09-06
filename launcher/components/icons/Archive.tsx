import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Line, Polyline, Rect, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const ArchiveIcon: FC<Props> = ({ style, size, color }) => {
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
			<Polyline points="21 8 21 21 3 21 3 8" />
			<Rect x="1" y="3" width="22" height="5" />
			<Line x1="10" y1="12" x2="14" y2="12" />
		</Svg>
	);
};

ArchiveIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default ArchiveIcon;
