import type { FC } from 'react';
import type { Card, CardState } from '@underrealm/murg';
import { CardType } from '@underrealm/murg';
import { Box, Text } from 'ink';

interface Props {
	card: Card;
	state: CardState;
	index: number;
	color?: string;
}

export const DeckCard: FC<Props> = ({ card, state, index, color }) => {
	const dimColor = index % 2 === 0;
	const isSpell = card.kind === CardType.Spell;
	const dotColor = isSpell ? 'green' : 'black';

	return (
		<Box>
			<Text color={dotColor}> • </Text>
			<Text dimColor={dimColor} color={color}>
				{state.id.substring(10)}
			</Text>
		</Box>
	);
};

DeckCard.defaultProps = {
	color: 'white',
};

export default DeckCard;
