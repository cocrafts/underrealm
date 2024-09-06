import type { FC, ReactNode } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface Props {
	style?: ViewStyle | ViewStyle[];
	contentContainerStyle?: ViewStyle;
	children: ReactNode;
}

export const UnderRealmBoard: FC<Props> = ({
	style,
	contentContainerStyle,
	children,
}) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.overlay} />
			<View style={[styles.contentContainer, contentContainerStyle]}>
				{children}
			</View>
		</View>
	);
};

export default UnderRealmBoard;

const styles = StyleSheet.create({
	container: {
		borderColor: '#9f835f',
		borderWidth: 1,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#180d05',
		opacity: 0.5,
	},
	contentContainer: {
		width: '100%',
		flex: 1,
	},
});
