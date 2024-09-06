import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';

interface Props {
	onPress: () => void;
	label: string;
}

const DropdownItem: React.FC<Props> = ({ onPress, label }) => {
	const [color, setColor] = React.useState<string>('#fff');

	const onHoverIn = () => setColor('#dfc57a');
	const onHoverOut = () => setColor('#fff');

	return (
		<TouchableOpacity onPress={onPress}>
			<Hoverable onHoverIn={onHoverIn} onHoverOut={onHoverOut}>
				<Animated.View>
					<Text style={[styles.label, { color }]} responsiveSizes={[12]}>
						{label}
					</Text>
				</Animated.View>
			</Hoverable>
		</TouchableOpacity>
	);
};

export default DropdownItem;

const styles = StyleSheet.create({
	label: {
		fontWeight: '600',
		marginVertical: 8,
	},
});
