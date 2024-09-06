import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
	style?: ViewStyle;
	imageUri?: string;
	characters?: string;
	size?: number;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#555555',
		alignItems: 'center',
		justifyContent: 'center',
	},
	character: {
		fontSize: 14,
		color: '#FFFFFF',
	},
});

export const Avatar: FC<Props> = ({
	style,
	imageUri,
	characters,
	size = 32,
	onPress,
}) => {
	const flattenStyle = StyleSheet.flatten(style);
	const borderSize = flattenStyle?.borderWidth || 0;
	const avatarSize = size - borderSize * 2;
	const containerStyle = {
		width: size,
		height: size,
		borderRadius: size / 2,
	};
	const avatarStyle = {
		width: avatarSize,
		height: avatarSize,
		borderRadius: avatarSize / 2,
	};

	return (
		<TouchableOpacity
			style={[styles.container, containerStyle, style]}
			onPress={onPress}
		>
			{imageUri ? (
				<Image style={avatarStyle} source={{ uri: imageUri }} />
			) : (
				<Text style={styles.character}>
					{characters?.substring?.(0, 1) || '?'}
				</Text>
			)}
		</TouchableOpacity>
	);
};

Avatar.defaultProps = {
	size: 32,
};

export default Avatar;
