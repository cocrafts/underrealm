import type { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Avatar from 'components/Avatar';
import type { Profile } from 'utils/graphql';

import { styles } from './internal';

interface Props {
	profile: Profile;
	onPress?: () => void;
	onAvatarPress?: () => void;
}

export const Account: FC<Props> = ({ profile, onPress, onAvatarPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Avatar size={42} onPress={onAvatarPress} imageUri={profile.avatarUrl} />
			{/* <View style={styles.infoContainer}></View> */}
		</TouchableOpacity>
	);
};

export default Account;
