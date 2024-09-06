import { StyleSheet } from 'react-native';
import { noSelect } from 'utils/styles';

export const modalStyles = StyleSheet.create({
	container: {
		borderRadius: 18,
		paddingTop: 32,
		paddingBottom: 24,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.02)',
	},
	modalTitle: {
		...noSelect,
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		paddingHorizontal: 12,
		marginBottom: 8,
	},
	buttonContainer: {
		marginVertical: 4,
		marginHorizontal: 24,
	},
	hyperLink: {
		fontSize: 11,
		textAlign: 'center',
		marginVertical: 6,
	},
});
