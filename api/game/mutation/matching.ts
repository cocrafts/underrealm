import { move } from '@metacraft/murg-engine';
import {
	batchWrite,
	deleteItem,
	putItem,
	rangeQuery,
	wrapDeleteRequest,
} from 'aws/dynamo';
import { publish, topicGenerator } from 'aws/pubsub';
import type { MutationResolvers } from 'types/graphql';
import type { DynamoRecord } from 'types/internal';
import { microId } from 'utils/uuid';

import { makeDuel } from '../duel';
import type { CardDuelRecord, MatchFindRecord } from '../types';

export const stopMatchFind: MutationResolvers['stopMatchFind'] = async (
	root,
	args,
	{ user },
) => {
	if (!user.id) return false;

	const key = `WSS#matchFind#MURG#profile#${user.id}`;
	const records = (await rangeQuery('pk', key))?.Items as DynamoRecord[];
	const subscriptionPairs = records.map(({ pk, sk }) => ({ pk, sk }));

	await batchWrite(subscriptionPairs, wrapDeleteRequest);
	return true;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const findMatch = async (
	root,
	{ game = 'MURG', version = '00001' },
	{ user },
) => {
	const operations = [];
	const timestamp = new Date().toISOString();
	const matchFindings = (await rangeQuery('gui', 'matchFinds', `${game}#`))
		?.Items as MatchFindRecord[];
	const foundMatch = matchFindings.find((i) => i.version === version);

	if (foundMatch?.pk) {
		const gameId = microId();
		const gamePk = `cardDuel#${gameId}`;
		const firstPlayerId = foundMatch.playerId;
		const secondPlayerId = user.id;
		const firstPlayerPk = `profile#${firstPlayerId}`;
		const secondPlayerPk = `profile#${secondPlayerId}`;
		const { state, config } = makeDuel(version, firstPlayerId, secondPlayerId);
		const { duel, commandBundles } = move.distributeInitialCards(state);

		move.distributeTurnCards(duel).commandBundles.forEach((bundle) => {
			commandBundles.push(bundle);
		});

		const cardDuel: CardDuelRecord = {
			pk: gamePk,
			sk: gamePk,
			gui: 'cardDuels',
			gur: timestamp,
			type: 'CardDuel',
			config,
			history: commandBundles,
		};

		const gameRecords = [
			cardDuel,
			{
				pk: firstPlayerPk,
				sk: gamePk,
				gsi: firstPlayerPk,
				gsr: `duelPlaying#${timestamp}`,
				type: 'DuelHistory',
				enemyId: secondPlayerId,
				timestamp,
			},
			{
				pk: secondPlayerPk,
				sk: gamePk,
				gsi: secondPlayerPk,
				gsr: `duelPlaying#${timestamp}`,
				type: 'DuelHistory',
				enemyId: firstPlayerId,
				timestamp,
			},
		];

		const matchFoundTopic = topicGenerator.matchFound({
			game: game as never,
			userId: foundMatch.playerId,
		});

		operations.push(deleteItem([foundMatch.pk, foundMatch.sk]));
		operations.push(batchWrite(gameRecords));
		operations.push(publish(matchFoundTopic, { matchFound: cardDuel }));
		await Promise.all(operations);

		return cardDuel;
	} else {
		const findMatchRecord: MatchFindRecord = {
			pk: `profile#${user.id}`,
			sk: `${game}#matchFind`,
			type: 'MatchFind',
			gui: 'matchFinds',
			gur: `${game}#${timestamp}`,
			ttl: 1000 * 60 * 60 * 2 /* <-- two hours */,
			version,
			playerId: user.id,
			playerMmr: 0,
			timestamp,
		};

		await putItem(findMatchRecord);
	}
};
