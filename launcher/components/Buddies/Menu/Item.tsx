import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from 'components/Text';

interface Props {
	style?: ViewStyle;
	title?: string;
	onPress?: () => void;
}

export const BuddyMenuItem: FC<Props> = ({ style, title, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.container, style]}>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};

export default BuddyMenuItem;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.05)',
	},
	title: {
		color: '#FFFFFF',
		fontSize: 12,
	},
});
