import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';

interface Props {
	id: string;
	activeOption: string;
	title: string;
	onPress: (id: string) => void;
}

const Option: FC<Props> = ({ id, activeOption, title, onPress }) => {
	const isActive = activeOption === id;

	return (
		<TouchableOpacity style={styles.container} onPress={() => onPress(id)}>
			<Text style={[styles.optionText, isActive && styles.activeText]}>
				{title}
			</Text>
			<View
				style={[styles.optionIndicator, isActive && styles.activeIndicator]}
			>
				<View style={[styles.innerIndicator]} />
			</View>
		</TouchableOpacity>
	);
};

export default Option;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	optionText: {
		fontSize: 16,
		marginBottom: 10,
	},
	optionIndicator: {
		width: 12,
		height: 12,
		transform: [{ rotate: '45deg' }],
		borderColor: '#fff9a0',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		opacity: 0.5,
	},
	innerIndicator: {
		width: 6,
		height: 6,
		backgroundColor: '#fff9a0',
	},
	activeText: {
		textShadowColor: '#fff9a0',
		textShadowRadius: 5,
	},
	activeIndicator: {
		opacity: 1,
	},
});
