import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Circle, Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const RibbonIcon: FC<Props> = ({ style, size, color }) => {
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
			<Circle cx="256" cy="160" r="128" />
			<Path d="M143.65 227.82L48 400l86.86-.42a16 16 0 0113.82 7.8L192 480l88.33-194.32" />
			<Path d="M366.54 224L464 400l-86.86-.42a16 16 0 00-13.82 7.8L320 480l-64-140.8" />
			<Circle cx="256" cy="160" r="64" />
		</Svg>
	);
};

RibbonIcon.defaultProps = {
	size: 24,
	color: 'white',
};

export default RibbonIcon;
