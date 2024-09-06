import type { FC } from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AnimateDirections, BindDirections, modalActions } from '@metacraft/ui';
import type { Profile } from 'utils/types/graphql';

import Account from './Account';
import SignedMenu from './Menu';

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
		modalActions.show({
			id: 'signedOptions',
			component: SignedMenu,
			bindingRef: containerRef,
			bindingDirection: BindDirections.BottomLeft,
			animateDirection: AnimateDirections.BottomLeft,
		});
	};

	return (
		<View ref={containerRef} style={styles.container}>
			<Account profile={profile} onPress={onPress} onAvatarPress={onPress} />
		</View>
	);
};

export default Signed;
