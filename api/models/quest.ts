import { model, Types } from 'mongoose';

import { generateRandomCode } from '../utils/common';

import { createSchema } from './utils';

const questSchema = createSchema({
	title: String,
	description: String,
	type: {
		type: String,
		enum: [
			'LIKE_X',
			'RETWEET_X',
			'COMMENT_X',
			'FOLLOW_X',
			'JOIN_DISCORD',
			'CHAT_DISCORD',
		],
	},
	status: {
		type: String,
		enum: ['INIT', 'LIVE', 'DISABLE'],
	},
	code: {
		type: String,
		unique: true,
		length: 4,
	},
	url: String,
	points: Number,
});

questSchema.pre('save', function (next) {
	if (!this.code) {
		this.code = generateRandomCode(4, '1234567890');
	}
	next();
});

export const Quest = model('Quest', questSchema);

const questActionSchema = createSchema({
	questId: { type: Types.ObjectId, ref: 'Quest' },
	userId: { type: Types.ObjectId, ref: 'User' },
	claimedPoints: Number,
});

questActionSchema.index({ questId: 1, userId: 1 }, { unique: true });

export const QuestAction = model('QuestAction', questActionSchema);
