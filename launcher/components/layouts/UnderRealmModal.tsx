import type { FC, ReactNode } from 'react';
import type { ImageStyle, ViewStyle } from 'react-native';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import resources from 'utils/resources';

interface Props {
	style?: ViewStyle;
	children: ReactNode;
}

export const UnderRealmModal: FC<Props> = ({ style, children }) => {
	return (
		<ImageBackground
			source={resources.marketplace.popupBackground}
			style={[styles.container, style]}
		>
			<Image source={resources.marketplace.popupBorder} style={styles.top} />
			<Image source={resources.marketplace.popupBorder} style={styles.bottom} />
			<Image source={resources.marketplace.popupBorder} style={styles.left} />
			<Image source={resources.marketplace.popupBorder} style={styles.right} />
			{children}
		</ImageBackground>
	);
};

export default UnderRealmModal;

const verticalBorder = {
	position: 'absolute',
	width: 10,
	top: 0,
	bottom: 0,
} as ImageStyle;

const horizontalBorder = {
	position: 'absolute',
	height: 10,
	left: 0,
	right: 0,
} as ImageStyle;

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	top: {
		...horizontalBorder,
		top: 0,
	},
	bottom: {
		...horizontalBorder,
		bottom: 0,
	},
	left: {
		...verticalBorder,
		left: 0,
	},
	right: {
		...verticalBorder,
		right: 0,
	},
});
