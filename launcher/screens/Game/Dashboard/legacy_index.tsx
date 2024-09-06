import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@metacraft/ui';
import CompactLayout from 'components/layouts/Compact';

import GameInvitations from './GameInvitations';

export const GameDashboard: FC = () => {
	return (
		<CompactLayout>
			<Button
				outline
				title="PLAY"
				style={styles.playButton}
				titleStyle={styles.playTitle}
			/>
			<GameInvitations />
		</CompactLayout>
	);
};

export default GameDashboard;

const styles = StyleSheet.create({
	playButton: {
		top: 50,
		left: 50,
		width: 150,
	},
	playTitle: {
		fontSize: 32,
		fontWeight: '600',
	},
});
