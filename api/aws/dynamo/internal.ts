import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import type { NativeAttributeValue } from '@aws-sdk/util-dynamodb';

import { regionConfig } from '../utils';

export const dynamoClient = new DynamoDBClient(regionConfig);
export const client = DynamoDBDocumentClient.from(dynamoClient);

export type HashKeys = 'pk' | 'gsi' | 'gti' | 'gfi' | 'gui';
export type RangeKeys = 'sk' | 'gsr' | 'gtr' | 'gfr' | 'gur';
export const hashToRangeMap: Record<HashKeys, RangeKeys> = {
	pk: 'sk',
	gsi: 'gsr',
	gti: 'gtr',
	gfi: 'gfr',
	gui: 'gur',
};

export type ItemPair = [string, string];
export type KeyOrPair = string | ItemPair;
export type Attributes = { [key: string]: NativeAttributeValue };

export interface RangeQueryOptions {
	TableName?: string;
	operation?: 'begins_with';
	Limit?: number | undefined;
	ScanIndexForward?: boolean;
}

export const makeKeyPair = (keyOrPair: KeyOrPair) => {
	return typeof keyOrPair === 'string' ? [keyOrPair, keyOrPair] : keyOrPair;
};

export const pureUpdateOptions = (pairs = {}) => {
	const allKeys = Object.keys(pairs);
	const setKeys = allKeys.filter(
		(i) => pairs[i] !== undefined && pairs[i] !== null,
	);
	const removeKeys = allKeys.filter(
		(i) => pairs[i] === undefined || pairs[i] === null,
	);
	const setReduce = setKeys.reduce((a, i) => `${a} #${i} = :${i},`, 'SET');
	const removeReduce = removeKeys.reduce((a, i) => `${a} #${i},`, 'REMOVE');
	const setExpression =
		setKeys.length > 0 ? setReduce.substring(0, setReduce.length - 1) : '';
	const removeExpression =
		removeKeys.length > 0
			? removeReduce.substring(0, removeReduce.length - 1)
			: '';

	const UpdateExpression = `${setExpression} ${removeExpression}`.trim();
	const ExpressionAttributeNames = allKeys.reduce((a, i) => {
		a[`#${i}`] = i;
		return a;
	}, {});
	const ExpressionAttributeValues = setKeys.reduce((a, i) => {
		a[`:${i}`] = pairs[i];
		return a;
	}, {});

	const updateOptions = {
		UpdateExpression,
		ExpressionAttributeNames,
		ExpressionAttributeValues: undefined,
	};

	if (setKeys.length > 0) {
		updateOptions.ExpressionAttributeValues = ExpressionAttributeValues;
	}

	return updateOptions;
};

export type PutPayload = { Item: Attributes };
export type PutWrapper = (Item: Attributes) => { PutRequest: PutPayload };

export type DeletePayload = { Key: Attributes };
export type DeleteWrapper = (Key: Attributes) => {
	DeleteRequest: DeletePayload;
};

export type RequestWrapper = PutWrapper | DeleteWrapper;

export const wrapPutRequest: PutWrapper = (Item) => ({
	PutRequest: { Item },
});

export const wrapDeleteRequest: DeleteWrapper = (Key) => ({
	DeleteRequest: { Key },
});

export * from '../utils';
