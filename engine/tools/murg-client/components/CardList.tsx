import type { FC } from 'react';
import type { DuelState } from '@metacraft/murg-engine';
import { Box } from 'ink';

import Card from './Card';

interface Props {
	duel: DuelState;
	predict: DuelState;
	items: string[];
	height: number;
	color: string;
}

export const Player: FC<Props> = ({ duel, predict, items, height, color }) => {
	return (
		<Box justifyContent="center" height={height}>
			{items.map((id, i) => {
				return (
					<Card
						key={i}
						index={i}
						color={color}
						duel={duel}
						predict={predict}
						id={id}
					/>
				);
			})}
		</Box>
	);
};

export default Player;
