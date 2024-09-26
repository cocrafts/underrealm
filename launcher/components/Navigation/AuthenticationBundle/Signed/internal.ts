import { StyleSheet } from 'react-native';

const commandSize = 32;

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	inlineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	inlineIcon: {
		marginRight: 2,
	},
	primaryText: {
		color: '#DEDEDE',
		fontWeight: '300',
	},
	secondaryText: {
		color: 'rgba(255, 255, 255, 0.46)',
		fontSize: 11,
		fontWeight: '300',
	},
	commandContainer: {
		width: commandSize,
		height: commandSize,
		borderRadius: commandSize / 2,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
