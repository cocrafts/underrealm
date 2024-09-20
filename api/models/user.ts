import { model } from 'mongoose';

import { createSchema } from './utils';

export type IUser = {
	id: string;
	bindingId: string;
	address: string;
	name: string;
	email: string;
	avatarUrl: string;
	referralCode: string;
};

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
	linkedId: String,
	address: {
		type: String,
		index: true,
	},
	jwt: String,
	name: String,
	email: {
		type: String,
		index: true,
	},
	githubId: String,
	githubUrl: String,
	avatarUrl: String,
	mineral: Number,
	isOnline: Boolean,
});

export const User = model('User', userSchema);
