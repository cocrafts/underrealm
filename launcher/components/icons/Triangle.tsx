import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	borderRadius?: number;
	color?: string;
}

const TriangleIcon: FC<Props> = ({
	style,
	size = 24,
	borderRadius,
	color = '#3498fd',
}) => {
	const strokeWidth = borderRadius || size / 3;
	const radius = size / 2;
	const height = size * (Math.sqrt(3) / 2);
	const padding = strokeWidth / 2;

	return (
		<Svg style={style} width={size} height={size}>
			<Path
				d={`M${radius},${padding} ${size - padding},${
					height - padding
				} ${padding},${height - padding} Z`}
				fill={color}
				stroke={color}
				strokeWidth={strokeWidth}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default TriangleIcon;
