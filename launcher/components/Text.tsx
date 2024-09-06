import type { FC } from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
	essential: {
		fontFamily: 'Poppins',
	},
});

type Props = TextProps & {
	style?: TextStyle;
};

export const ManagedText: FC<Props> = ({ style, ...rest }) => {
	return <Text {...rest} style={[styles.essential, style]} />;
};

export default ManagedText;
