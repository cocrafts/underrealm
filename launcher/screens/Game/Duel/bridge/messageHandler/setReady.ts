import { graphQlClient } from 'utils/graphql';
import { profile as profileQuery } from 'utils/graphql/query';

import { MessageType } from '../internal';
import { send } from '../messenger';
import { bridgeState } from '../state';

export default (): void => {
	setTimeout(() => {
		sendContext();
	}, 2000);
};

const sendContext = (): void => {
	const { profile } = graphQlClient.readQuery({ query: profileQuery });
	if (bridgeState.duel) {
		const payload = {
			user: profile,
			duel: bridgeState.duel,
		};

		send(MessageType.PushContext, payload as never);
	} else {
		setTimeout(() => {
			sendContext();
		}, 2000);
	}
};
