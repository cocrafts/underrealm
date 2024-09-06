import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const MineralIcon: FC<Props> = ({ style, size, color }) => {
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
			<Path d="M12 3L3 13L12 21L21 13L12 3Z" />
			<Path d="M12 3L10 11L12 21" />
			<Path d="M3 13L10 11L21 13" />
		</Svg>
	);
};

MineralIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default MineralIcon;
