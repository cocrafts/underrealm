import type { FC } from 'react';
import type { DuelState } from '@underrealm/murg';
import { getCard, getCardState } from '@underrealm/murg';
import { Box, Text } from 'ink';

import GraveCard from './GraveCard';

interface Props {
	duel: DuelState;
	color?: string;
	cards?: string[];
}

export const GraveYard: FC<Props> = ({ duel, cards, color }) => {
	return (
		<Box alignSelf="center" borderStyle="round" borderColor="gray">
			{cards.map((id, i) => {
				const card = getCard(duel.cardMap, id);
				const state = getCardState(duel.stateMap, id);

				return <GraveCard card={card} state={state} key={i} />;
			})}
			<Text color={color}> • </Text>
		</Box>
	);
};

GraveYard.defaultProps = {
	color: 'gray',
};

export default GraveYard;
