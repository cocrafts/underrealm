import {
	BatchWriteCommand,
	DeleteCommand,
	PutCommand,
	UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { chunk } from 'utils/common';

import type { Attributes, ItemPair, RequestWrapper } from './internal';
import {
	client,
	defaultTable,
	makeKeyPair,
	pureUpdateOptions,
	wrapPutRequest,
} from './internal';

export const putItem = async (Item: Attributes, TableName = defaultTable) => {
	return await client.send(new PutCommand({ TableName, Item }));
};

export const updateItem = async (
	keyOrPair: string | ItemPair,
	attributes: Attributes,
	TableName = defaultTable,
) => {
	const [pk, sk] = makeKeyPair(keyOrPair);

	return await client.send(
		new UpdateCommand({
			TableName,
			Key: { pk, sk },
			...pureUpdateOptions(attributes),
		}),
	);
};

export const deleteItem = async (
	keyOrPair: string | ItemPair,
	TableName = defaultTable,
) => {
	const [pk, sk] = makeKeyPair(keyOrPair);
	return await client.send(new DeleteCommand({ TableName, Key: { pk, sk } }));
};

export const batchWrite = async (
	instances: Attributes[],
	requestWrapper: RequestWrapper = wrapPutRequest,
	TableName = defaultTable,
	chunkSize = 25,
) => {
	const itemChunks = chunk<Attributes>(instances, chunkSize);

	const promiseChunks = itemChunks.map((items) => {
		return client.send(
			new BatchWriteCommand({
				RequestItems: {
					[TableName]: items.map((i) => requestWrapper(i)),
				},
			}),
		);
	});

	return (await Promise.all(promiseChunks)).reduce(
		(acc, next) => acc.concat(next),
		[],
	);
};
