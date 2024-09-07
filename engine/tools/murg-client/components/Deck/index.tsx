import type { FC } from 'react';
import type { DuelState } from '@metacraft/murg-engine';
import { getCard, getCardState } from '@metacraft/murg-engine';
import { Box, Text } from 'ink';

import DeckCard from './DeckCard';

interface Props {
	duel: DuelState;
	color?: string;
	cardIds: string[];
}

export const CardDeck: FC<Props> = ({ duel, color, cardIds }) => {
	return (
		<Box borderStyle="round" borderColor="gray">
			{cardIds.map((id, i) => {
				const card = getCard(duel.cardMap, id);
				const state = getCardState(duel.stateMap, id);

				return (
					<DeckCard
						key={id}
						index={i}
						card={card}
						state={state}
						color={color}
					/>
				);
			})}
			<Text color="yellow"> • {cardIds.length} cards </Text>
			<Text color="gray"> • </Text>
		</Box>
	);
};

CardDeck.defaultProps = {
	color: 'green',
};

export default CardDeck;
