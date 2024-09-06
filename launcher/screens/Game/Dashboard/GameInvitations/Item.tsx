import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@metacraft/ui';
import Avatar from 'components/Avatar';
import type { GameInvitation } from 'utils/types/graphql';

interface Props {
	item: GameInvitation;
	onAccept?: (item: GameInvitation) => void;
	onReject?: (item: GameInvitation) => void;
}

export const GameInvitationItem: FC<Props> = ({ item, onAccept }) => {
	return (
		<View style={styles.container}>
			<Avatar size={40} imageUri={item.owner?.avatarUrl as string} />
			<View style={styles.infoContainer}>
				<Text style={styles.heading}>{item.owner?.name} </Text>
				<Text style={styles.description}>invite you play {item.game} Game</Text>
				<Text style={styles.expire}>expires in 30s</Text>
			</View>
			<Button title="Accept" onPress={() => onAccept?.(item)} />
		</View>
	);
};

export default GameInvitationItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 9,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 50,
		marginVertical: 8,
		marginRight: 4,
	},
	infoContainer: {
		flex: 1,
		paddingLeft: 8,
		paddingRight: 12,
	},
	heading: {
		color: '#DEDEDE',
	},
	description: {
		color: '#888888',
		fontSize: 12,
	},
	expire: {
		color: '#555555',
		fontSize: 12,
	},
});
