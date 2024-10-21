import type { CommandHandler } from '../util/type';
import { EventType } from '../util/type';

import { fetchDuel } from './internal';

export const onIncomingConnect: CommandHandler = async ({ duelId, send }) => {
	const duel = fetchDuel(duelId);
	await send({ duel });
	if (duel.winner) {
		await send({ winner: duel.winner }, EventType.GameOver);
	}
};
