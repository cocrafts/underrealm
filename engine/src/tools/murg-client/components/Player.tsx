import type { FC } from 'react';
import type { DuelState } from '@underrealm/murg';
import { selectPlayer } from '@underrealm/murg';
import { Box, Text } from 'ink';

interface Props {
	color: string;
	duel: DuelState;
	predict: DuelState;
	id: string;
}

export const Player: FC<Props> = ({ color, duel, predict, id }) => {
	const state = selectPlayer(duel, id);
	const future = selectPlayer(predict, id);
	const healthDiff = future.health - state.health;
	const diffColor = healthDiff > 0 ? 'green' : 'red';

	return (
		<Box justifyContent="center" alignItems="center">
			<Text color="gray">Hero: {state.perTurnHero} </Text>
			<Text color={color}>{String(state.health)}</Text>
			{healthDiff !== 0 && (
				<Text>
					<Text color="black"> (</Text>
					<Text color={diffColor}>{healthDiff}</Text>
					<Text color="black">)</Text>
				</Text>
			)}
			<Text color="gray"> Spell: {state.perTurnSpell}</Text>
		</Box>
	);
};

export default Player;
