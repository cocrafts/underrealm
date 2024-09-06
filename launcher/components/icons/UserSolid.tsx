import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const UserSolidIcon: FC<Props> = ({
	style,
	size = 24,
	color = '#cdc8b5',
}) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			viewBox="0 0 24 24"
		>
			<Path
				fill={color}
				d="M 12 4 C 9.790861 4 8 5.790861 8 8 C 8 10.209139 9.790861 12 12 12 C 14.209139 12 16 10.209139 16 8 C 16 5.790861 14.209139 4 12 4 z M 12 14 C 5.9 14 4 18 4 18 L 4 20 L 20 20 L 20 18 C 20 18 18.1 14 12 14 z"
			/>
		</Svg>
	);
};

export default UserSolidIcon;
