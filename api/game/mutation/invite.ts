import { getItem, putItem } from 'aws/dynamo';
import { publish, topicGenerator } from 'aws/pubsub';
import type { GameInvitation, MutationResolvers } from 'types/graphql';
import { nanoId } from 'utils/uuid';

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
	const { Item: ownerRec } = await getItem(`profile#${user.id}`);
	const { Item: opponentRec } = await getItem(`profile#${opponent}`);

	const inviteRecord: GameInvitationRecord = {
		pk: invitePrimary,
		sk: invitePrimary,
		gsi: `profile#${opponent}`,
		gsr: inviteRange,
		gti: `profile#${user.id}`,
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
	promises.push(publish(inviteTopic, inviteData));

	await Promise.all(promises);

	return inviteRecord as GameInvitation;
};
