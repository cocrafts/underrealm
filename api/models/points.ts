import { model, Types } from 'mongoose';
import { logger } from 'utils/logger';

import { User } from './user';
import { createSchema } from './utils';

export type IPointsHistory = {
	id: string;
	userId: string;
	bindingId: string;
	source: 'GAME' | 'QUEST';
};

const PointsHistorySchema = createSchema({
	userId: { type: Types.ObjectId, ref: 'User', required: true },
	bindingId: { type: Types.ObjectId, required: true },
	source: { type: String, enum: ['GAME', 'QUEST'], required: true },
	points: { Type: Number, required: true },
});

PointsHistorySchema.index({ userId: 1, bindingId: 1 }, { unique: true });

export const PointsHistory = model<IPointsHistory>(
	'PointsHistory',
	PointsHistorySchema,
);

const WINNER_POINTS = 50;
const LOSER_POINTS = 10;
const MAX_GAME_POINTS_PER_DAY = 200;

export const safeAddGamePoints = async (
	userId: string,
	duelId: string,
	isWinner: boolean,
): Promise<number> => {
	try {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const result = await PointsHistory.aggregate([
			{ $match: { userId, source: 'GAME', createdAt: { $gte: today } } },
			{ $group: { _id: null, totalPoints: { $sum: '$points' } } },
		]);

		const totalPointsToday = result.length > 0 ? result[0].totalPoints : 0;

		if (totalPointsToday < MAX_GAME_POINTS_PER_DAY) {
			const expectedPoints = isWinner ? WINNER_POINTS : LOSER_POINTS;

			const points = Math.min(
				expectedPoints,
				MAX_GAME_POINTS_PER_DAY - expectedPoints,
			);

			await PointsHistory.create({
				userId,
				bindingId: duelId,
				source: 'GAME',
				points,
			});

			await User.updateOne({ _id: userId }, { $inc: { points } });

			return points;
		}
	} catch (error) {
		logger.error('Failed to add game points', error);
	}

	return 0;
};
