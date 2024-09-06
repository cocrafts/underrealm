import type { FC } from 'react';
import { Polyline, Svg } from 'react-native-svg';

import type { IconProps } from '../shared';

export const ChevronDownIcon: FC<IconProps> = ({
	style,
	size = 24,
	color = 'white',
}) => {
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
			<Polyline points="6 9 12 15 18 9" />
		</Svg>
	);
};

export default ChevronDownIcon;
