import type { FC } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Image, ImageBackground } from 'react-native';
import resources from 'utils/resources';

interface Props {
	size?: number;
	source: ImageSourcePropType;
}

const Avatar: FC<Props> = ({ size = 64, source }) => {
	const borderStyle = {
		width: size,
		height: size,
		padding: 2,
	};

	const avatarStyle = {
		width: size - 4,
		height: size - 4,
	};

	return (
		<ImageBackground
			style={borderStyle}
			source={resources.profile.avatarBorder}
		>
			<Image style={avatarStyle} source={source} />
		</ImageBackground>
	);
};

export default Avatar;
