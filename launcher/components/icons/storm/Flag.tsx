import type { FC } from 'react';
import { G, Path, Svg } from 'react-native-svg';

import type { IconProps } from '../shared';

import { GateDefs, GatePaths } from './StormGate';

export const FlagIcon: FC<IconProps> = ({
	style,
	size = 120,
	colors = ['#002E46', '#004156', '#2C879B', '#FFFFFF'],
}) => {
	const height = (size as number) * 1.23417722;
	const [color1, color2, color3, gateColor] = colors || [];

	return (
		<Svg style={style} width={size} height={height} viewBox="0 0 158 195">
			<G transform="translate(0, -5)">
				<Path
					d="M147.168 111.127V48.1114L147.463 47.8575V47.6645L147.168 47.6544V42.8906L78.9622 45.2725L23.9893 51.9712L11.8521 59.457L10 155.128L14.5007 160.897L80.175 105.063L141.059 158.891L148.158 151.568L147.168 111.127Z"
					fill={color2}
				/>
				<Path
					d="M10.4609 126.491L25.8862 142.92V121.26L37.6632 130.467L39.2514 106.354L24.8562 99.7266H20.1931L10.6994 104.125L10.4609 126.491Z"
					fill={color1}
				/>
				<Path
					d="M147.461 126.491L132.173 141.859V121.214L120.264 130.467L118.676 106.354L133.071 99.7266H137.734L147.461 104.231V126.491Z"
					fill={color1}
				/>
				<Path
					d="M11.7142 51.5925L19.3964 47.3722L11.9426 39.602L12.1709 5H79.8164H147.462V16.4994V25.6053L139.719 33.9749L147.462 42.8929V115.73L134.655 130.6V112.424L120.732 124.039V150.214L120.65 150.209V150.214L112.719 158.888L106.23 150.92V140.697L106.255 140.692V136.121L93.3973 146.847L93.4429 160.762L79.5196 180L66.1544 160.762V148.218L50.6276 135.283L50.5616 150.214L42.6308 158.888L34.9689 149.478V140.9V122.231L22.7149 112.023V133.358L10.4609 120.138L11.7142 51.5925Z"
					fill={color3}
				/>
			</G>
			<G transform="scale(0.52), translate(28, 4)">
				<GatePaths color={gateColor} />
				<GateDefs color={gateColor} />
			</G>
		</Svg>
	);
};

export default FlagIcon;
