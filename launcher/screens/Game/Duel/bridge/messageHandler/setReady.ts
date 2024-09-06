import { accountState } from 'utils/state/account';

import { MessageType } from '../internal';
import { send } from '../messenger';
import { bridgeState } from '../state';

export default (): void => {
	setTimeout(() => {
		sendContext();
	}, 2000);
};

const sendContext = (): void => {
	if (bridgeState.duel) {
		const payload = {
			user: accountState.profile,
			duel: bridgeState.duel,
		};

		send(MessageType.PushContext, payload as never);
	} else {
		setTimeout(() => {
			sendContext();
		}, 2000);
	}
};
