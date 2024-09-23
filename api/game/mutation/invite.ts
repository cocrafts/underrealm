import { getItem, putItem } from 'utils/aws/dynamo';
import { nanoId } from 'utils/common';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type { GameInvitation, MutationResolvers } from 'utils/types';

import type { GameInvitationRecord } from '../types';

export const inviteGame: MutationResolvers['inviteGame'] = async (
	root,
	{ input },
	{ user },
) => {
	const { game, opponent } = input;
	const promises = [];
	const inviteId = nanoId();
	const invitePrimary = `gameInvitation#${inviteId}`;
	const inviteRange = `gameInvitation#${new Date().toISOString()}`;
	const { Item: ownerRec } = await getItem(`profile#${user.bindingId}`);
	const { Item: opponentRec } = await getItem(`profile#${opponent}`);

	const inviteRecord: GameInvitationRecord = {
		pk: invitePrimary,
		sk: invitePrimary,
		gsi: `profile#${opponent}`,
		gsr: inviteRange,
		gti: `profile#${user.bindingId}`,
		gtr: inviteRange,
		id: invitePrimary,
		type: 'GameInvitation',
		game,
		owner: ownerRec as never,
		enemy: opponentRec as never,
		timestamp: new Date().toISOString(),
		ttl: Math.floor(Date.now() / 1000) + 30,
	} as unknown;

	const inviteTopic = topicGenerator.gameInvitation({ opponent });
	const inviteData = { gameInvitation: inviteRecord };

	promises.push(putItem(inviteRecord));
	promises.push(pubsub.publish(inviteTopic, inviteData));

	await Promise.all(promises);

	return inviteRecord as GameInvitation;
};
