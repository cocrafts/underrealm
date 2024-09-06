import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';

interface Props {
	minWidth?: number;
	firstItem?: boolean;
	item: {
		title?: string;
		value?: number | string;
	};
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 0.04)',
		marginHorizontal: 5,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
	},
	backgroundContainer: {
		overflow: 'hidden',
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: 10,
	},
	value: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
		color: '#FFFFFF',
	},
	caption: {
		fontSize: 10,
		fontWeight: '200',
		textAlign: 'center',
		color: 'rgba(255, 255, 255, 0.7)',
	},
	separator: {
		color: '#FFFFFF',
		fontSize: 18,
		position: 'absolute',
		top: 14,
		left: -6,
	},
});

export const CountdownBlock: FC<Props> = ({ minWidth = 56, item }) => {
	return (
		<View style={[styles.container, { minWidth, height: minWidth }]}>
			<View>
				<Text style={styles.value}>{item.value}</Text>
				<Text style={styles.caption}>{item.title}</Text>
			</View>
		</View>
	);
};

export default CountdownBlock;
