import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ModalConfigs } from '@metacraft/ui';
import { modalActions } from '@metacraft/ui';
import { liveActions } from 'utils/state/live';
import type { Profile } from 'utils/types/graphql';

import MenuItem from './Item';

interface Props {
	config: ModalConfigs;
}

export const BuddyMenu: FC<Props> = ({ config }) => {
	const profile = config.context as Profile;

	const onInvite = () => {
		modalActions.hide(config.id as string);
		liveActions.sendGameInvitation(profile.address);
	};

	return (
		<View style={styles.container}>
			<MenuItem title="Send Invite" onPress={onInvite} />
			<MenuItem style={styles.lastMenuItem} title="Send Message" />
		</View>
	);
};

export default BuddyMenu;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 24,
	},
	lastMenuItem: {
		borderColor: 'transparent',
	},
});
