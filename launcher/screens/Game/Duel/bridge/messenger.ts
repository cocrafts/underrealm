import type { MessagePayload, MessageType } from './internal';
import { parseData } from './internal';
import { handleMessage } from './messageHandler';

interface MessengerGlobal {
	frame?: HTMLIFrameElement;
}

const global: MessengerGlobal = {};

export const onMessage = (e: MessageEvent): void => {
	const payload = parseData(e.data);

	if (payload?.source === 'gameClient') {
		handleMessage?.(payload);
	}
};

export const send = (type: MessageType, payload: MessagePayload): void => {
	global.frame?.contentWindow?.postMessage(
		JSON.stringify({ type, ...payload }),
		'*',
	);
};

export const setFrame = (frame: HTMLIFrameElement): void => {
	global.frame = frame;
};
