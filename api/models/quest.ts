import { model, Types } from 'mongoose';

import { createSchema } from './utils';

const questSchema = createSchema({
	title: String,
	description: String,
	type: {
		type: String,
		enum: ['LIKE_X', 'RETWEET_X', 'JOIN_DISCORD', 'COMMENT_X'],
	},
	status: {
		type: String,
		enum: ['INIT', 'LIVE', 'DISABLE'],
	},
	url: String,
	points: Number,
	questActions: [
		{
			type: Types.ObjectId,
			ref: 'QuestAction',
		},
	],
});

export const Quest = model('Quest', questSchema);

const questActionSchema = createSchema({
	quest: { type: Types.ObjectId, ref: 'Quest' },
	user: { type: 'string', ref: 'User' },
	claimedPoints: Number,
});

questActionSchema.index({ quest: 1, user: 1 }, { unique: true });

export const QuestAction = model('QuestAction', questActionSchema);
