import type { CommandHandler } from '../util/type';
import { DuelCommands } from '../util/type';

import { fetchDuel } from './internal';

export const onIncomingConnect: CommandHandler = async ({
	userId,
	duelId,
	send,
}) => {
	const context = { userId, duelId };
	const duel = fetchDuel(duelId);
	await send({ context, duel });
	if (duel.winner) {
		await send({ winner: duel.winner }, DuelCommands.GameOver);
	}
};
