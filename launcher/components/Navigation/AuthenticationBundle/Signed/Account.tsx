import type { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Avatar from 'components/Avatar';
import type { Profile } from 'utils/graphql';

import { styles } from './internal';

interface Props {
	profile: Profile;
	onPress?: () => void;
	onAvatarPress?: () => void;
}

export const Account: FC<Props> = ({ profile, onPress, onAvatarPress }) => {
	const { address } = profile;

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={styles.infoContainer}></View>
			<Avatar size={20} characters={address} onPress={onAvatarPress} />
		</TouchableOpacity>
	);
};

export default Account;
