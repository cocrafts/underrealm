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

export const Account: FC<Props> = ({ profile, onAvatarPress }) => {
	return (
		<TouchableOpacity onPress={onAvatarPress} style={styles.container}>
			<Avatar size={42} imageUri={profile.avatarUrl} />
			{/* <View style={styles.infoContainer}></View> */}
		</TouchableOpacity>
	);
};

export default Account;
