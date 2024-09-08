import { model } from 'mongoose';

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
});

export const User = model('User', userSchema);
