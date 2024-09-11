import { model, Schema } from 'mongoose';
import { generateReferralCode } from 'utils/referral';

const userSchema = new Schema({
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

export const getOrCreateUserByBindingId = async (bindingId: string) => {
	const user = await User.findOne({ bindingId }).exec();
	if (user) {
		return user;
	}
	try {
		const referralCode = generateReferralCode(7);
		const newUser = new User({ bindingId, points: 0, referralCode });
		await newUser.save();
		return newUser;
	} catch (err) {
		throw new Error(`Failed to create new user: ${err}`);
	}
};

export const getUserByReferralCode = async (referralCode: string) => {
	return await User.findOne({ referralCode });
};
