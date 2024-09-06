import type { FC, RefObject } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AnimateDirections, BindDirections, modalActions } from '@metacraft/ui';
import { useBuddies } from 'utils/hook';
import type { Profile } from 'utils/types/graphql';

import type { BuddyProps } from './BuddyItem';
import BuddyItem from './BuddyItem';
import BuddyMenu from './Menu';

interface Props {
	width: number;
}

export const Buddies: FC<Props> = ({ width }) => {
	const { list } = useBuddies();

	const onBuddyPress = (profile: Profile, bindingRef: RefObject<View>) => {
		modalActions.show({
			id: 'buddyMenu',
			component: BuddyMenu,
			bindingRef,
			bindingDirection: BindDirections.Left,
			animateDirection: AnimateDirections.TopLeft,
			positionOffset: { x: -50, y: 0 },
			context: profile,
		});
	};

	const renderBuddy = (props: BuddyProps) => {
		return <BuddyItem {...props} onPress={onBuddyPress} />;
	};

	return (
		<View style={[styles.container, { width }]}>
			<FlatList
				showsVerticalScrollIndicator={false}
				data={list}
				renderItem={renderBuddy}
			/>
		</View>
	);
};

export default Buddies;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingLeft: 16,
	},
});
