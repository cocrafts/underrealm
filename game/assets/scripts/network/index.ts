import { system } from '../util/system';
import { GameEventType } from '../util/types';

import * as handlers from './handlers';
import { ws } from './util';

console.log('Game network started');

ws.onmessage = (item) => {
	const { userId, type, payload } = JSON.parse(item.data);
	const isMyCommand = system.userId === userId;

	if (type === GameEventType.ConnectMatch) {
		handlers.connect(payload, isMyCommand);
	} else if (type === GameEventType.SendBundle) {
		handlers.incomingBundles(payload);
	} else if (type === GameEventType.CardHover) {
		if (!isMyCommand) {
			handlers.cardHover(payload);
		}
	} else if (type === GameEventType.GameOver) {
		handlers.gameOver(payload);
	}
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	console.log('Websocket opened');
	system.isSocketReady = true;
};

ws.onclose = () => {
	console.log('Websocket closed');
};

export const waitForSocket = (maxRetry = 150): Promise<boolean> => {
	let retryCount = 0;

	return new Promise((resolve, reject) => {
		const waitInterval = setInterval(() => {
			if (system.isSocketReady) {
				resolve(true);
				clearInterval(waitInterval);
			} else if (retryCount > maxRetry) {
				reject('too many retries, socket may not be ready');
				clearInterval(waitInterval);
			}

			retryCount += 1;
		}, 200);
	});
};

export * from './sender';
