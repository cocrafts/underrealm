import { type IUser, User } from 'models/user';
import {
	generateRandomCode,
	getRandomAvatar,
	REFERRAL_CODE_LENGTH,
} from 'utils/common';
import { ForbiddenError } from 'utils/errors';

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
