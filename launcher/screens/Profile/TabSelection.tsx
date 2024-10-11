import type { FC } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface Props {
	title: String;
	onPress?: () => void;
	isActive: boolean;
}

const TabSelection: FC<Props> = ({ title, onPress, isActive }) => {
	const { styles } = useStyles(stylesheet);

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<ImageBackground
				style={styles.imageBackground}
				resizeMode="stretch"
				source={isActive ? resources.profile.tabActiveBackground : { uri: '' }}
			>
				<Text>{title}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default TabSelection;

const stylesheet = createStyleSheet(() => ({
	container: {
		padding: 8,
	},
	imageBackground: {
		alignSelf: 'flex-start',
		padding: 4,
	},
}));
