import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import resources from 'utils/resources';

import UserSolidIcon from './icons/UserSolid';

interface Props {
	style?: ViewStyle;
	imageUri?: string;
	size?: number;
	onPress?: () => void;
}

export const Avatar: FC<Props> = ({ style, imageUri, size = 32 }) => {
	const avatarSize = size - 2 * 2;

	const containerStyle = {
		width: size,
		height: size,
		borderRadius: 0,
	};

	const avatarStyle = {
		width: avatarSize,
		height: avatarSize,
		borderRadius: 0,
	};

	return (
		<ImageBackground
			source={resources.navigation.userIconBackground}
			style={[styles.container, containerStyle, style]}
		>
			{imageUri ? (
				<Image source={{ uri: imageUri }} style={avatarStyle} />
			) : (
				<UserSolidIcon size={size * 0.7} />
			)}
		</ImageBackground>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
});
