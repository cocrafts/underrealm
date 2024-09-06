import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const DiamondIcon: FC<Props> = ({ style, size, color }) => {
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
			<Path d="M35.42 188.21l207.75 269.46a16.17 16.17 0 0025.66 0l207.75-269.46a16.52 16.52 0 00.95-18.75L407.06 55.71A16.22 16.22 0 00393.27 48H118.73a16.22 16.22 0 00-13.79 7.71L34.47 169.46a16.52 16.52 0 00.95 18.75zM48 176h416" />
			<Path d="M400 64l-48 112-96-128M112 64l48 112 96-128M256 448l-96-272M256 448l96-272" />
		</Svg>
	);
};

DiamondIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default DiamondIcon;
