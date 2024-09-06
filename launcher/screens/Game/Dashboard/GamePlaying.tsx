import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { ModalConfigs } from '@metacraft/ui';
import { Button, modalActions } from '@metacraft/ui';
import Avatar from 'components/Avatar';
import { liveActions } from 'utils/state/live';
import type { CardDuelHistory } from 'utils/types/graphql';

interface Props {
	config: ModalConfigs;
}

export const GamePlaying: FC<Props> = ({ config }) => {
	const { id } = config;
	const duel = config.context as CardDuelHistory;

	const onResume = () => {
		modalActions.hide(id as string);
		liveActions.resumePlayingGame(duel);
	};

	return (
		<View style={styles.container}>
			<Avatar
				style={styles.avatar}
				size={42}
				imageUri={duel.enemy?.avatarUrl as string}
			/>
			<View style={styles.innerContainer}>
				<Text style={styles.message}>
					You are on a match with {duel.enemy?.name}, would you like to continue
					it?
				</Text>
				<View style={styles.commandContainer}>
					<Button outline title="Cancel" style={styles.buttonContainer} />
					<Button
						outline
						title="Resume"
						style={styles.buttonContainer}
						onPress={onResume}
					/>
				</View>
			</View>
		</View>
	);
};

export default GamePlaying;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.08)',
		borderRadius: 24,
		width: 300,
		margin: 20,
	},
	avatar: {
		margin: 12,
	},
	message: {
		color: '#DEDEDE',
	},
	innerContainer: {
		flex: 1,
		padding: 12,
		paddingLeft: 0,
	},
	commandContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 14,
	},
	buttonContainer: {
		marginLeft: 12,
	},
});
