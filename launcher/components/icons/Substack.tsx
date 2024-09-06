import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

const SubstackIcon: FC<Props> = ({ style, size = 22, color = '#fff' }) => {
	const height = (size * 24) / 22;

	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 22 24"
		>
			<Path
				fill={color}
				d="M21.539 8.242H0.459961V5.406H21.54V8.242H21.539ZM0.459961 10.812V24L11 18.11L21.54 24V10.812H0.459961ZM21.54 0H0.459961V2.836H21.54V0Z"
			/>
		</Svg>
	);
};

export default SubstackIcon;
