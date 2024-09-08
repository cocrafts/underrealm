import { getItem, rangeQuery } from 'aws/dynamo';
import { getParameter } from 'aws/parameter';
import jwt from 'jsonwebtoken';
import { requireConditions } from 'utils/helper';
import type { Resolver } from 'utils/runtime';

import type {
	CardDuelRecord,
	GameInvitationRecord,
	JwtPayload,
} from '../types';

type InvitationsSignature = Resolver<never, GameInvitationRecord[]>;

export const gameInvitations: InvitationsSignature = async (
	root,
	args,
	{ user },
) => {
	const { Items: invitations } = await rangeQuery(
		'gsi',
		`profile#${user.id}`,
		'gameInvitation#',
		{ ScanIndexForward: false, Limit: 10 },
	);
	const filterRecent = ({ timestamp }) => {
		const timeDiff = Date.now() - new Date(timestamp).getTime();
		return Math.floor(timeDiff / 1000) < 30;
	};

	return invitations.filter(filterRecent) as never;
};

type JwtSignature = Resolver<{ duelId: string }, string>;

export const gameJwt: JwtSignature = async (root, { duelId }, { user }) => {
	const duel = (await getItem(`cardDuel#${duelId}`))?.Item as CardDuelRecord;

	requireConditions([
		[!!user?.id, 'Require authenticated user'],
		[!!duel?.pk, 'Duel could not be found'],
	]);

	const { Parameter } = await getParameter('murg-client-jwt');
	const payload: JwtPayload = { userId: user.id, duelId };
	const options = { expiresIn: '1d' };

	return jwt.sign(payload, Parameter.Value, options);
};
