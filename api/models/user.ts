import { model } from 'mongoose';

import { createSchema } from './utils';

export type IUser = {
	id: string;
	bindingId: string;
	name?: string;
	wallet?: string;
	email?: string;
	avatarUrl?: string;
	referralCode: string;
	points: number;
};

const userSchema = createSchema({
	/** bindingId is used to bind this user with dynamodb profile (will be deprecated soon) */
	bindingId: {
		type: String,
		index: true,
		unique: true,
		required: true,
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
		required: true,
	},
	wallet: {
		type: String,
		index: true,
	},
	name: String,
	email: {
		type: String,
		index: true,
	},
	avatarUrl: String,
});

export const User = model<IUser>('User', userSchema);
