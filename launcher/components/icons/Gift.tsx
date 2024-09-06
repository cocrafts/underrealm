import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Line, Path, Polyline, Rect, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const GiftIcon: FC<Props> = ({ style, size, color }) => {
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
			<Polyline points="20 12 20 22 4 22 4 12" />
			<Rect x="2" y="7" width="20" height="5" />
			<Line x1="12" y1="22" x2="12" y2="7" />
			<Path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
			<Path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
		</Svg>
	);
};

GiftIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default GiftIcon;
