import { navigate } from 'stacks/Browser/shared';
import type { CardDuelHistory } from 'utils/graphql';

export const resumePlayingGame = async (
	history: CardDuelHistory,
): Promise<void> => {
	navigate('Game', { id: history.id } as never);
};
