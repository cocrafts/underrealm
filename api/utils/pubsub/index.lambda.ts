/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PubSubEngine } from 'graphql-subscriptions';

export * from './utils';

export class LambdaPubsub implements PubSubEngine {
	public asyncIterator<T>(triggers: string | string[]): AsyncIterable<T> {
		console.log(triggers);
		return {} as never;
	}

	public async publish(triggerName: string, payload: any): Promise<void> {
		console.log(triggerName, payload);
	}

	public async subscribe(
		triggerName: string,
		onMessage: (...args: any[]) => void,
	): Promise<number> {
		console.log(triggerName, onMessage);
		return 0;
	}

	public unsubscribe(subId: number) {
		console.log(subId);
	}
}
