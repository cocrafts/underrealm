import type { FC } from 'react';
import { Polyline, Svg } from 'react-native-svg';

import type { IconProps } from '../shared';

export const ChevronRightIcon: FC<IconProps> = ({
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
			<Polyline points="9 18 15 12 9 6" />
		</Svg>
	);
};

export default ChevronRightIcon;
