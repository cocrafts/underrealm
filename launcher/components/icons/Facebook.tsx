import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

const FacebookIcon: FC<Props> = ({ style, size = 42, color = '#fff' }) => {
	const height = (size * 64) / 42;

	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 42 64"
		>
			<Path
				fill={color}
				fillRule={'evenodd'}
				clipRule={'evenodd'}
				d="M27.958 16.2632C29.447 14.8832 31.7521 15.0336 31.9213 15.0411L41.5664 15.0374L41.777 1.12057L40.3217 0.763333C39.3892 0.534 36.5352 0 30.2442 0C19.0423 0 11.5142 7.8402 11.5142 19.5046V22.6369H0.233398V37.678H11.5142V64H26.5554V37.678H38.4454L40.5135 22.6369H26.5554V20.3318C26.5554 18.5006 27.0292 17.1281 27.958 16.2632Z"
			/>
		</Svg>
	);
};

export default FacebookIcon;
