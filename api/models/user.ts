import { model } from 'mongoose';
import { generateRandomCode } from 'utils/referral';

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
		min: 0,
		default: 0,
	},
	referralCode: {
		type: String,
		index: true,
		unique: true,
	},
});

export const User = model('User', userSchema);
const REFERRAL_CODE_LENGTH = 7;

export const getOrCreateUserByBindingId = async (bindingId: string) => {
	const user = await User.findOne({ bindingId }).exec();
	if (user) {
		return user;
	}

	const referralCode = generateRandomCode(REFERRAL_CODE_LENGTH);
	const newUser = User.create({ bindingId, points: 0, referralCode });
	return newUser;
};
