import type { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';

interface Props {
	label: string;
	onRemove: () => void;
}

const FilterTag: FC<Props> = ({ label, onRemove }) => {
	return (
		<View style={styles.container}>
			<Text responsiveSizes={[16]}>{label}</Text>
			<TouchableOpacity onPress={onRemove}>
				<Text style={styles.close} responsiveSizes={[24]}>
					&times;
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default FilterTag;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#6f571e',
		paddingVertical: 2,
		paddingHorizontal: 8,
		borderRadius: 8,
		width: 140,
		justifyContent: 'space-between',
		alignItems: 'center',
		marginLeft: 10,
		height: 30,
	},
	close: {
		color: '#ffd669',
	},
});
