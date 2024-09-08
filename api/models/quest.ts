import { model, Types } from 'mongoose';

import { createSchema } from './utils';

const questSchema = createSchema({
	title: String,
	description: String,
	type: String,
	status: {
		type: String,
		enum: ['INIT', 'LIVE', 'DISABLE'],
	},
	url: String,
	points: Number,
});

export const Quest = model('Quest', questSchema);

const questActionSchema = createSchema({
	questId: Types.ObjectId,
	userId: Types.ObjectId,
});

questActionSchema.index({ questId: 1, userId: 1 }, { unique: true });

export const QuestAction = model('QuestAction', questActionSchema);