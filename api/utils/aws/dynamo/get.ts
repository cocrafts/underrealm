import { GetCommand } from '@aws-sdk/lib-dynamodb';

import type { ItemPair } from './internal';
import { client, defaultTable } from './internal';

export const getItem = async (key, TableName = defaultTable) => {
	return await client.send(
		new GetCommand({
			TableName,
			Key: { pk: key, sk: key },
		}),
	);
};

export const getItemByPair = async (
	[pk, sk]: ItemPair,
	TableName = defaultTable,
) => {
	return await client.send(
		new GetCommand({
			TableName,
			Key: { pk, sk },
		}),
	);
};
