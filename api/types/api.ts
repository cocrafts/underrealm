// import type { GameSubscription } from './graphql';
import type { DynamoRecord } from './internal';

export interface Block<T> {
	index: number;
	time: string;
	hash: string;
	previousHash: string;
	data: T;
}

export interface EncryptedData {
	iv: string;
	content: string;
}

// export type GameSubscriptionRecord = DynamoRecord & GameSubscription;
export type GameSubscriptionRecord = DynamoRecord;
