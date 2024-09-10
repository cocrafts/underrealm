import { model } from 'mongoose';
import { generateReferralCode } from 'utils/referral';

import { createSchema } from './utils';

const userSchema = createSchema({
	/** bindingId is used to bind this user with dynamodb profile (will be deprecated soon) */
	bindingId: {
		type: String,
		index: true,
		unique: true,
	},
	points: {
		type: Number,
		default: 0,
	},
	referralCode: {
		type: String,
		index: true,
		unique: true,
	},
});

export const User = model('User', userSchema);

export const getOrCreateUserByBindingId = async (bindingId: string) => {
	const query = User.where({ bindingId });
	const user = await query.findOne(query);

	if (user) {
		return user;
	}

	const referralCode = generateReferralCode(7);
	const newUser = await User.create({ bindingId, referralCode });
	return newUser;
};

export const getUserByReferralCode = async (referralCode: string) => {
	const query = User.where({ referralCode });
	return await query.findOne();
};
