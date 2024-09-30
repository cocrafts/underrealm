import { StyleSheet } from 'react-native';
import { Text } from '@metacraft/ui';
import packageJSON from 'package.json';

export const Version = () => {
	return <Text style={styles.version}>{`v${packageJSON.version}`}</Text>;
};

export default Version;

const styles = StyleSheet.create({
	version: {
		position: 'absolute',
		bottom: 12,
		right: 32,
		opacity: 0.3,
	},
});
