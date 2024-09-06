import type { FC } from 'react';
import { G, Path, Svg } from 'react-native-svg';

import type { IconProps } from '../shared';

import { dragonPath } from './StormGate';

export const FlagIcon: FC<IconProps> = ({
	style,
	size = 120,
	color = '#FFFFFF',
}) => {
	const height = (size as number) * 1.3494832;

	return (
		<Svg
			fill="green"
			style={style}
			width={size}
			height={height}
			viewBox="0 0 232 218"
		>
			<G transform="scale(3), translate(-82, -55)">
				<Path fill={color} d={dragonPath} />
			</G>
		</Svg>
	);
};

export default FlagIcon;
