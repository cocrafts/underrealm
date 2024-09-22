import type { QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { BatchGetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

import type { HashKeys, KeyOrPair, RangeQueryOptions } from './internal';
import { client, defaultTable, hashToRangeMap, makeKeyPair } from './internal';

export const rangeQuery = async <T = never>(
	hash: HashKeys,
	hashValue,
	rangeValue?: string,
	options: RangeQueryOptions = {},
): Promise<{ Items: T[] }> => {
	const {
		TableName = defaultTable,
		operation = 'begins_with',
		...otherOptions
	} = options;
	const queryInput: QueryCommandInput = {
		TableName,
		KeyConditionExpression: `${hash} = :${hash}`,
		ExpressionAttributeValues: {
			[`:${hash}`]: hashValue,
		},
		...otherOptions,
	};

	if (rangeValue) {
		const range = hashToRangeMap[hash];

		queryInput.KeyConditionExpression += ` AND ${operation}(${range}, :${range})`;
		queryInput.ExpressionAttributeValues[`:${range}`] = rangeValue;
	}

	if (hash !== 'pk') {
		queryInput.IndexName = hash;
	}

	return (await client.send(new QueryCommand(queryInput))) as never;
};

export const batchGet = async (keys: KeyOrPair[], TableName = defaultTable) => {
	return client.send(
		new BatchGetCommand({
			RequestItems: {
				[TableName]: {
					Keys: keys.map((keyOrPair) => {
						const [pk, sk] = makeKeyPair(keyOrPair);
						return { pk, sk };
					}),
				},
			},
		}),
	);
};
