import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import {
	Circle,
	Defs,
	Line,
	LinearGradient,
	Stop,
	Svg,
} from 'react-native-svg';

interface Props {
	width?: number;
	color?: string;
	style?: ViewStyle;
}

export const HeaderLine: FC<Props> = ({
	width = 264,
	color = '#C68F5A',
	style,
}) => {
	const height = (width * 8) / 264;

	return (
		<Svg
			width={width}
			height={height}
			viewBox="0 0 264 8"
			fill="none"
			style={style}
		>
			<Line
				x1="264"
				y1="5"
				x2="7"
				y2="4.99998"
				stroke="url(#paint0_linear_1090_58)"
				strokeWidth="2"
			/>
			<Circle cx="4" cy="4" r="4" fill={color} />
			<Defs>
				<LinearGradient
					id="paint0_linear_1090_58"
					x1="-25.0432"
					y1="2.99478"
					x2="267.27"
					y2="2.9948"
					gradientUnits="userSpaceOnUse"
				>
					<Stop stopColor={color} />
					<Stop offset="1" stopColor={color} stopOpacity="0" />
				</LinearGradient>
			</Defs>
		</Svg>
	);
};
