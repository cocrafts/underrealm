import type { RefObject } from 'react';
import { useEffect } from 'react';

import { onMessage, setFrame } from './messenger';
import { bridgeState } from './state';

export const useBridge = (
	duelId: string,
	frame: RefObject<HTMLIFrameElement>,
): void => {
	useEffect(() => {
		bridgeState.duelId = duelId;
		window.addEventListener('message', onMessage);

		return () => window.removeEventListener('message', onMessage);
	}, [duelId]);

	useEffect(() => {
		frame.current && setFrame(frame.current);
	}, [frame.current]);
};
