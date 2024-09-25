import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

const XIcon: FC<Props> = ({ style, size = 20, color = '#fff' }) => {
	const height = (size * 16) / 20;
	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 512 512"
		>
			<Path
				fill={color}
				d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
			/>
		</Svg>
	);
};

export default XIcon;
