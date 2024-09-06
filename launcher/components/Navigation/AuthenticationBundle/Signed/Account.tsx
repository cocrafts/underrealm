import type { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@metacraft/ui';
import Avatar from 'components/Avatar';
import type { Profile } from 'utils/types/graphql';

import { styles } from './internal';

interface Props {
	profile: Profile;
	onPress?: () => void;
	onAvatarPress?: () => void;
}

export const Account: FC<Props> = ({ profile, onPress, onAvatarPress }) => {
	const { address, name, avatarUrl } = profile;

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={styles.infoContainer}>
				<Text style={styles.primaryText}>{name}</Text>
			</View>
			<Avatar
				size={20}
				imageUri={avatarUrl as string}
				characters={address}
				onPress={onAvatarPress}
			/>
		</TouchableOpacity>
	);
};

export default Account;
