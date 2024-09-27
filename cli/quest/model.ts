import { model, Schema, Types } from 'mongoose';

const questSchema = new Schema(
	{
		title: String,
		description: String,
		type: {
			type: String,
			enum: ['LIKE_X', 'RETWEET_X', 'JOIN_DISCORD', 'COMMENT_X'],
		},
		status: {
			type: String,
			enum: ['INIT', 'LIVE', 'DISABLE'],
			default: 'INIT',
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
	},
	{
		timestamps: true,
	},
);
// Pre-save hook to generate and assign the hash
questSchema.pre('save', function (next) {
	if (!this.code) {
		this.code = generateRandomCode(4, '1234567890');
	}
	next();
});

// Function to generate a random 4-character hash
export function generateRandomCode(length: number, charSet: string) {
	let code = '';
	for (let i = 0; i < length; i++) {
		const randomChar = charSet[Math.floor(Math.random() * charSet.length)];
		code += randomChar;
	}
	return code;
}

export const Quest = model('Quest', questSchema);
