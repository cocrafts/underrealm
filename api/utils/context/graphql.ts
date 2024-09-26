import type { IUser } from 'models/user';
import { User } from 'models/user';
import {
	generateRandomCode,
	getRandomAvatar,
	REFERRAL_CODE_LENGTH,
} from 'utils/common';
import { ForbiddenError } from 'utils/errors';

import { verifyToken } from './jwt';

export type UserProfile = IUser;

export type ApiContext = {
	user: UserProfile;
};

type ContextOptions = {
	authHeader?: string;
	isIntrospection?: boolean;
};

export const resolveUniversalContext = async ({
	authHeader,
	isIntrospection,
}: ContextOptions) => {
	if (authHeader) {
		const token = authHeader.replace('Bearer ', '');
		const cognitoUser = await verifyToken(token);

		let user: IUser = await User.findOne({ bindingId: cognitoUser.username });

		if (!user) {
			user = await User.create({
				bindingId: cognitoUser.username,
				address: cognitoUser.wallet,
				email: cognitoUser.email,
				avatarUrl: getRandomAvatar(),
				referralCode: generateRandomCode(REFERRAL_CODE_LENGTH),
			});
		}

		return { user };
	} else if (!isIntrospection) {
		throw new ForbiddenError('Require Authorization token');
	}
};
