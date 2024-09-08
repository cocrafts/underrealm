import { getItem, rangeQuery } from 'aws/dynamo';
// import { CardDuel } from 'types/graphql';
import type { Resolver } from 'utils/runtime';

// type HistoryResolver = Resolver<{ limit: number }, CardDuel[]>;
type HistoryResolver = Resolver<{ limit: number }, unknown[]>;

export const cardDuelHistory: HistoryResolver = async (
	root,
	{ limit },
	{ user },
) => {
	const { Items: duels } = await rangeQuery(
		'gsi',
		`profile#${user.id}`,
		'duelHistory#',
		{ Limit: limit || 1, ScanIndexForward: false },
	);

	return duels;
};

export const cardDuelPlaying = async (root, args, { user }) => {
	const { Items: duels } = await rangeQuery(
		'gsi',
		`profile#${user.id}`,
		'duelPlaying#',
		{ Limit: 1, ScanIndexForward: false },
	);

	return duels[0];
};

// type DuelResolver = Resolver<{ id: string }, CardDuel>;
type DuelResolver = Resolver<{ id: string }, unknown>;

export const cardDuel: DuelResolver = async (root, { id }) => {
	const result = await getItem(`cardDuel#${id}`);
	return result.Item;
};
