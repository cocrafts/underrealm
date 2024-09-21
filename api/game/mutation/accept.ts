import type { PlayerConfig } from '@metacraft/murg-engine';
import { makeDuel, makeMeta, move } from '@metacraft/murg-engine';
import { batchWrite, deleteItem, getItem } from 'utils/aws/dynamo';
import type { MutationResolvers } from 'utils/types';
import { nanoId } from 'utils/uuid';

import { generateRandomDeck } from '../duel';

export const acceptGame: MutationResolvers['acceptGame'] = async (
	root,
	{ invitationId },
) => {
	const operations = [];
	const invitation = (await getItem(invitationId))?.Item;
	const { owner, enemy } = invitation;
	const meta = makeMeta('00001');
	const firstPlayer: PlayerConfig = {
		id: owner.address,
		deck: generateRandomDeck(meta),
	};
	const secondPlayer: PlayerConfig = {
		id: enemy.address,
		deck: generateRandomDeck(meta),
	};
	const { state, config } = makeDuel([firstPlayer, secondPlayer], meta.version);
	const { commandBundles } = move.distributeInitialCards(state);

	const gameId = nanoId();
	const gamePk = `cardDuel#${gameId}`;
	const timestamp = new Date().toISOString();

	const gameRecords = [
		{
			pk: gamePk,
			sk: gamePk,
			id: gameId,
			type: 'CardDuel',
			gui: 'cardDuels',
			gur: timestamp,
			config,
			history: commandBundles,
		},
		{
			pk: `profile#${owner.address}`,
			sk: gamePk,
			gsi: `profile#${owner.address}`,
			gsr: `duelPlaying#${timestamp}`,
			type: 'DuelHistory',
			timestamp,
			opponent: enemy.address,
		},
		{
			pk: `profile#${enemy.address}`,
			sk: gamePk,
			gsi: `profile#${enemy.address}`,
			gsr: `duelPlaying#${timestamp}`,
			type: 'DuelHistory',
			timestamp,
			opponent: owner.address,
		},
	];

	operations.push(deleteItem(invitationId));
	operations.push(batchWrite(gameRecords));

	await Promise.all(operations);
	return true;
};
