import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { navigationRef } from 'stacks/Browser/shared';
import type { Profile } from 'utils/graphql';

import Account from './Account';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
});

interface Props {
	profile: Profile;
}

export const Signed: FC<Props> = ({ profile }) => {
	const containerRef = useRef<View>(null);

	const onPress = () => {
		navigationRef.navigate('Profile');
	};

	return (
		<View ref={containerRef} style={styles.container}>
			<Account profile={profile} onPress={onPress} onAvatarPress={onPress} />
		</View>
	);
};

export default Signed;
