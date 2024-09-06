import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const UserIcon: FC<Props> = ({ style, size, color }) => {
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
			<Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<Circle cx="12" cy="7" r="4" />
		</Svg>
	);
};

UserIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default UserIcon;
