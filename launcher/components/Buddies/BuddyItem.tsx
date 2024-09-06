import type { FC, RefObject } from 'react';
import { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Avatar from 'components/Avatar';
import Text from 'components/Text';
import { shortenAddress } from 'utils/helper';
import type { Profile } from 'utils/types/graphql';

export interface BuddyProps {
	index: number;
	item: Profile;
	onPress?: (item: Profile, ref: RefObject<View>) => void;
}

export const BuddyItem: FC<BuddyProps> = ({ item, onPress }) => {
	const { name, address } = item;
	const containerRef = useRef<View>(null);

	const handlePress = () => {
		onPress?.(item, containerRef);
	};

	return (
		<TouchableOpacity onPress={handlePress} style={styles.container}>
			<Avatar
				onPress={handlePress}
				size={avatarSize}
				imageUri={item.avatarUrl as string}
			/>
			<View style={styles.onlineCircle} />
			<View ref={containerRef} style={styles.infoContainer}>
				<Text style={styles.name}>{name || shortenAddress(address || '')}</Text>
				<Text style={styles.onlineText}>Online</Text>
			</View>
		</TouchableOpacity>
	);
};

export default BuddyItem;

const avatarSize = 32;
const circleSize = 10;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 6,
	},
	onlineCircle: {
		position: 'absolute',
		top: avatarSize - circleSize / 2,
		left: avatarSize - circleSize,
		width: circleSize,
		height: circleSize,
		borderRadius: circleSize / 2,
		backgroundColor: '#8eda42',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.4)',
	},
	infoContainer: {
		flex: 1,
		paddingLeft: 8,
	},
	name: {
		marginTop: 4,
		fontSize: 13,
		lineHeight: 13,
		color: 'rgba(255, 255, 255, 0.4)',
	},
	onlineText: {
		color: 'rgba(255, 255, 255, 0.2)',
		fontSize: 11,
		fontWeight: '300',
		opacity: 0.72,
	},
});
