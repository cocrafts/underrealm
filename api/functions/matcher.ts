import { makeDuel } from 'game/duel';
import { GameMatch } from 'models/game';
import { logger } from 'utils/logger';
import { pubsub } from 'utils/pubsub';
import { redis } from 'utils/redis';

/**
 * Game Matching with REDIS, only for reference
 *
 * important: need to make sure execution time of each job running is less than schedule interval.
 * The current implementation does not ensure atomicity of findMatch pubsub topic.
 *
 * This job will retrieve a bundle of findMatch subscriptions, after publish match found event with gameId,
 * It will invalidate the all findMatch topics to make sure there is no more `publish` for each findMatch
 */
export const handler = async () => {
	logger.info('start matching job');

	let pendingFindingKey: string;
	const matchPromises = [];

	for await (const key of redis.scanIterator({
		MATCH: `matchFinding:user#*`,
		COUNT: 100,
	})) {
		if (!pendingFindingKey) {
			pendingFindingKey = key;
			return;
		}

		matchPromises.push(initializeGameMatch(pendingFindingKey, key));

		pendingFindingKey = null;
	}

	await Promise.all(matchPromises);

	logger.info('end matching job');

	return { statusCode: 200 };
};

const initializeGameMatch = async (
	firstFindingKey: string,
	secondFindingKey: string,
) => {
	const [firstTopic, secondTopic] = await Promise.all([
		redis.GETDEL(firstFindingKey),
		redis.GETDEL(secondFindingKey),
	]);

	if (!firstTopic) {
		logger.warn(`Not found pubsub topic of: ${firstFindingKey}`);
		return;
	}
	if (!secondTopic) {
		logger.warn(`Not found pubsub topic of: ${secondFindingKey}`);
		return;
	}

	const firstPlayerId = firstFindingKey.split('#')[1];
	const secondPlayerId = secondFindingKey.split('#')[1];

	const { config, commandBundles } = makeDuel(
		'00001',
		firstPlayerId,
		secondPlayerId,
	);

	const gameMatch = await GameMatch.create({ config, history: commandBundles });

	await Promise.all([
		pubsub.publish(firstTopic, { findMatch: { id: gameMatch.id } }),
		pubsub.publish(secondTopic, { findMatch: { id: gameMatch.id } }),
	]);
};
