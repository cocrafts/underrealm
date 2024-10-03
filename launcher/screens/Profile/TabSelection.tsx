import type { FC } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface Props {
	title: String;
	onPress?: () => void;
	isActive: boolean;
}

const TabSelection: FC<Props> = ({ title, onPress, isActive }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<ImageBackground
				source={isActive ? resources.profile.tabActiveBackground : { uri: '' }}
			>
				<Text>{title}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default TabSelection;
