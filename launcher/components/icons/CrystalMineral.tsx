import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const CrystalMineralIcon: FC<Props> = ({ style, size, color }) => {
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
			<Path d="M18 8.5C15.5 4.5 12 3 12 3C12 3 8.5 4.5 6 8.5C3.5 12.5 3 17 3 17C3 17 7 19 12 19C17 19 21 17 21 17C21 17 20.5 12.5 18 8.5Z" />
			<Path d="M15.3333 10.0938C13.9444 7.84375 12 7 12 7C12 7 10.0556 7.84375 8.66667 10.0938C7.27778 12.3438 7 14.875 7 14.875C7 14.875 9.22222 16 12 16C14.7778 16 17 14.875 17 14.875C17 14.875 16.7222 12.3438 15.3333 10.0938Z" />
			<Path d="M3 17L7 15" />
			<Path d="M17 15L21 17" />
			<Path d="M12 7V3" />
		</Svg>
	);
};

CrystalMineralIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default CrystalMineralIcon;
