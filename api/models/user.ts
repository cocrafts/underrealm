import { model, Types } from 'mongoose';

import { createSchema } from './utils';

export type IUser = {
	id: string;
	bindingId: string;
	address: string;
	name: string;
	email: string;
	avatarUrl: string;
	referralCode: string;
	points: number;
	questActions: string[];
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
	address: {
		type: String,
		index: true,
	},
	name: String,
	email: {
		type: String,
		index: true,
	},
	avatarUrl: String,
	questActions: [
		{
			type: Types.ObjectId,
			ref: 'QuestAction',
		},
	],
});

export const User = model('User', userSchema);
