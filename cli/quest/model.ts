import { model, Schema, Types } from 'mongoose';

const questSchema = new Schema({
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
	createdAt: Date,
});

export const Quest = model('Quest', questSchema);
