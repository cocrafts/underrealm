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
	code: {
		type: String,
		unique: true,
		length: 4,
	},
	questActions: [
		{
			type: Types.ObjectId,
			ref: 'QuestAction',
		},
	],
	createdAt: Date,
});
// Pre-save hook to generate and assign the hash
questSchema.pre('save', function (next) {
	if (!this.code) {
		this.code = generateRandomHash();
	}
	next();
});

// Function to generate a random 4-character hash
export function generateRandomHash(length: number = 4): string {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}

export const Quest = model('Quest', questSchema);
