import { GameMatch } from 'models/game';
import { pubsub, topicGenerator } from 'utils/pubsub';

import type { CommandHandler } from './types';
import { EventType } from './types';

export const onIncomingConnect: CommandHandler = async ({
	matchId,
	send,
}): Promise<void> => {
	const match = await GameMatch.findById(matchId);
	const topic = topicGenerator.match({ matchId });

	await pubsub.subscribe(topic);
	await send({ match }, EventType.ConnectMatch);
	if (match.winner) {
		await send({ winner: match.winner }, EventType.GameOver);
	}
};
