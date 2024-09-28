import { GameDuel } from 'models/game';
import { pubsub, topicGenerator } from 'utils/pubsub';

import type { CommandHandler } from './types';
import { EventType } from './types';

export const onIncomingConnect: CommandHandler = async ({
	duelId,
	send,
}): Promise<void> => {
	const duel = await GameDuel.findById(duelId);
	const topic = topicGenerator.duel({ duelId });

	await pubsub.subscribe(topic);
	await send({ duel }, EventType.ConnectMatch);
	if (duel.winner) {
		await send({ winner: duel.winner }, EventType.GameOver);
	}
};
