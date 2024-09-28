import type { IUser } from 'models/user';
import { User } from 'models/user';
import {
	generateRandomCode,
	getRandomAvatar,
	REFERRAL_CODE_LENGTH,
} from 'utils/common';
import { ForbiddenError } from 'utils/errors';
import type { ResolverFn } from 'utils/types';

import { verifyToken } from './jwt';

export type UserProfile = IUser;

export type ApiContext = {
	user?: UserProfile;
};

type ContextOptions = {
	authHeader?: string;
	isIntrospection?: boolean;
};

export const resolveUniversalContext = async ({
	authHeader,
}: ContextOptions) => {
	let user: IUser;
	if (authHeader) {
		const token = authHeader.replace('Bearer ', '');
		const cognitoUser = await verifyToken(token);

		user = await User.findOne({ bindingId: cognitoUser.username });

		if (!user) {
			user = await User.create({
				bindingId: cognitoUser.username,
				address: cognitoUser.wallet,
				email: cognitoUser.email,
				avatarUrl: getRandomAvatar(),
				referralCode: generateRandomCode(REFERRAL_CODE_LENGTH),
			});
		}
	}
	return { user };
};

export const requireAuth = <TResult, TParent, TArgs>(
	resolver: ResolverFn<TResult, TParent, Required<ApiContext>, TArgs>,
): ResolverFn<TResult, TParent, ApiContext, TArgs> => {
	return (root, parent, context, args) => {
		if (!context.user) {
			throw new ForbiddenError('Require Authorization token');
		}

		return resolver(root, parent, { ...context, user: context.user }, args);
	};
};
