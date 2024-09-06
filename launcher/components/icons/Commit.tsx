import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const CommitIcon: FC<Props> = ({ style, size, color }) => {
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
			<Circle cx="256" cy="256" r="96" />
			<Path d="M160 256H48M464 256H352" />
		</Svg>
	);
};

CommitIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default CommitIcon;
