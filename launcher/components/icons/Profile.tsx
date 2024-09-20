import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

interface Props {
	style?: ViewStyle;
	size?: number;
	color?: string;
}

export const Profile: FC<Props> = ({ style, size, color }) => {
	return (
		<Svg
			style={style}
			width={size}
			height={size}
			viewBox="0 0 25 25"
			fill="none"
		>
			<Path
				d="M12.0605 12.4687C14.822 12.4687 17.0605 10.2302 17.0605 7.46875C17.0605 4.70733 14.822 2.46875 12.0605 2.46875C9.29912 2.46875 7.06055 4.70733 7.06055 7.46875C7.06055 10.2302 9.29912 12.4687 12.0605 12.4687Z"
				fill={color}
			/>
			<Path
				d="M12.0588 15.0156C7.04875 15.0156 2.96875 18.3756 2.96875 22.5156C2.96875 22.7956 3.18875 23.0156 3.46875 23.0156H20.6488C20.9288 23.0156 21.1488 22.7956 21.1488 22.5156C21.1488 18.3756 17.0688 15.0156 12.0588 15.0156Z"
				fill={color}
			/>
		</Svg>
	);
};

Profile.defaultProps = {
	size: 24,
	color: '#ffffff',
};

export default Profile;
