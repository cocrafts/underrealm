import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

const InstagramIcon: FC<Props> = ({ style, size = 54, color = '#fff' }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			fill="none"
			viewBox="0 0 54 54"
		>
			<Path
				fill={color}
				d="M42.9999 0.333344H10.9999C5.13325 0.333344 0.333252 5.13334 0.333252 11V43C0.333252 48.8667 5.13325 53.6667 10.9999 53.6667H42.9999C48.8666 53.6667 53.6666 48.8667 53.6666 43V11C53.6666 5.13334 48.8666 0.333344 42.9999 0.333344ZM26.9999 40.3333C19.6666 40.3333 13.6666 34.3333 13.6666 27C13.6666 19.6667 19.6666 13.6667 26.9999 13.6667C34.3333 13.6667 40.3333 19.6667 40.3333 27C40.3333 34.3333 34.3333 40.3333 26.9999 40.3333ZM41.6666 15C40.1999 15 38.9999 13.8 38.9999 12.3333C38.9999 10.8667 40.1999 9.66668 41.6666 9.66668C43.1333 9.66668 44.3333 10.8667 44.3333 12.3333C44.3333 13.8 43.1333 15 41.6666 15Z"
			/>
		</Svg>
	);
};

export default InstagramIcon;
