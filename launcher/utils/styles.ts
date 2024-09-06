import { Platform, StyleSheet } from 'react-native';

export const iStyles = StyleSheet.create({
	wideContainer: {
		width: '100%',
		maxWidth: 2600,
		marginHorizontal: 'auto',
	},
	contentContainer: {
		width: '100%',
		maxWidth: 1600,
		marginHorizontal: 'auto',
	},
});

export const noSelect = Platform.select({
	web: { userSelect: 'none' },
	default: {},
});
