import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

const TwitterIcon: FC<Props> = ({ style, size = 20, color = '#fff' }) => {
	const height = (size * 16) / 20;
	return (
		<Svg
			style={style}
			width={size}
			height={height}
			fill="none"
			viewBox="0 0 20 16"
		>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				fill={color}
				d="M0.578125 13.2416C2.54438 13.4691 5.00173 13.0684 6.5634 11.8661C4.93647 11.8365 3.56424 10.7808 3.09104 9.32983C3.64851 9.43496 4.22201 9.41371 4.76979 9.26719C3.08917 8.93641 1.69642 7.36495 1.78853 5.64074C2.28932 5.91437 2.86208 6.07921 3.47176 6.09789C2.4739 5.4433 1.81761 4.32533 1.81761 3.05827C1.81761 2.3894 2.00182 1.76264 2.32102 1.22307C4.15415 3.43264 6.89378 4.88542 9.98281 5.03817C9.11211 1.38571 13.7546 -0.973308 16.3175 1.70843C17.1643 1.54469 17.9593 1.24029 18.6779 0.822332C18.4001 1.67473 17.8109 2.39013 17.0435 2.84179C17.7952 2.75351 18.5119 2.5579 19.1779 2.26705C18.6805 2.9993 18.0492 3.64217 17.3228 4.12679C17.5085 10.0925 12.64 15.0157 6.56601 15.0208C4.3488 15.0222 2.28932 14.3669 0.578125 13.2416Z"
			/>
		</Svg>
	);
};

export default TwitterIcon;
