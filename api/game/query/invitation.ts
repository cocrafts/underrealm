import jwt from 'jsonwebtoken';
import { getItem, rangeQuery } from 'utils/aws/dynamo';
import { getParameter } from 'utils/aws/parameter';
import { requireConditions } from 'utils/helper';
import type { QueryResolvers } from 'utils/types';

import type { CardDuelRecord, JwtPayload } from '../types';

export const gameInvitations: QueryResolvers['gameInvitations'] = async (
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

export const gameJwt: QueryResolvers['gameJwt'] = async (
	root,
	{ duelId },
	{ user },
) => {
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
