import type { MessageData } from '../internal';
import { MessageType } from '../internal';

import setReadyHandler from './setReady';

export const handleMessage = (payload: MessageData): void => {
	if (payload.type === MessageType.NotifyReady) {
		setReadyHandler();
	}
};
