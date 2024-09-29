import { model, Types } from 'mongoose';
import { getStartOfToday } from 'utils/common/date';
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
	points: { type: Number, required: true },
});

PointsHistorySchema.index({ userId: 1, bindingId: 1 }, { unique: true });

export const PointsHistory = model<IPointsHistory>(
	'PointsHistory',
	PointsHistorySchema,
);

export const WINNER_POINTS = 50;
export const LOSER_POINTS = 10;
export const MAX_GAME_POINTS_PER_DAY = 200;

export const safeAddGamePoints = async (
	userId: string,
	duelId: string,
	isWinner: boolean,
): Promise<number> => {
	const totalPointsToday = await getTotalGamePointsToday(userId);
	try {
		if (totalPointsToday < MAX_GAME_POINTS_PER_DAY) {
			const expectedPoints = isWinner ? WINNER_POINTS : LOSER_POINTS;
			const remainingPoints = MAX_GAME_POINTS_PER_DAY - totalPointsToday;

			const points = Math.min(expectedPoints, remainingPoints);

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

export const getTotalGamePointsToday = async (userId: string) => {
	const today = getStartOfToday();
	const result = await PointsHistory.aggregate([
		{
			$match: {
				userId: Types.ObjectId.createFromHexString(userId),
				source: 'GAME',
				createdAt: { $gte: today },
			},
		},
		{ $group: { _id: null, totalPoints: { $sum: '$points' } } },
	]);

	const totalPointsToday = result.length > 0 ? result[0].totalPoints : 0;

	return totalPointsToday;
};
