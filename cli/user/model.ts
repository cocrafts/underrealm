import { model } from 'mongoose';

import { createSchema } from './../utils/mongo';

export type IUser = {
	id: string;
	bindingId: string;
	address?: string;
	email?: string;
};

const UserSchema = createSchema({
	/** bindingId is used to bind this user with dynamodb profile (will be deprecated soon) */
	bindingId: {
		type: String,
		index: true,
		unique: true,
		required: true,
	},
	address: {
		type: String,
		index: true,
	},
	email: {
		type: String,
		index: true,
	},
});

export const User = model<IUser>('User', UserSchema);
