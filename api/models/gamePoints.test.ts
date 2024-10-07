import {
	clearDatabase,
	connectToTestDB,
	disconnectTestDB,
	mockId,
} from 'utils/test';

import {
	getTotalGamePointsToday,
	LOSER_POINTS,
	MAX_GAME_POINTS_PER_DAY,
	safeAddGamePoints,
	WINNER_POINTS,
} from './gamePoints';
import type { IUser } from './user';
import { User } from './user';

describe('Test safeAddGoPoints', () => {
	let user: IUser;

	beforeAll(async () => {
		await connectToTestDB();
	});

	afterAll(async () => {
		await clearDatabase();
		await disconnectTestDB();
	});

	beforeEach(async () => {
		user = await User.create({
			bindingId: mockId(),
		});
	});

	it('add points normally', async () => {
		await safeAddGamePoints(user.id, mockId(), true);
		user = await User.findById(user.id);
		expect(user.points).toEqual(WINNER_POINTS);

		await safeAddGamePoints(user.id, mockId(), false);
		user = await User.findById(user.id);
		expect(user.points).toEqual(WINNER_POINTS + LOSER_POINTS);

		const totalGamePointsToday = await getTotalGamePointsToday(user.id);
		expect(totalGamePointsToday).toEqual(WINNER_POINTS + LOSER_POINTS);
	});

	it('add exceed max points', async () => {
		const maxCount = Math.ceil(MAX_GAME_POINTS_PER_DAY / WINNER_POINTS);

		for (let i = 0; i < maxCount; i++) {
			const totalGamePointsToday = await getTotalGamePointsToday(user.id);
			const points = await safeAddGamePoints(user.id, mockId(), true);
			if (i === maxCount - 1) {
				expect(points).toEqual(MAX_GAME_POINTS_PER_DAY - totalGamePointsToday);
			} else {
				expect(points).toEqual(WINNER_POINTS);
			}
		}
	});

	it('add exceed max points fallback to remaining points', async () => {
		const maxCount = Math.ceil(MAX_GAME_POINTS_PER_DAY / WINNER_POINTS);

		for (let i = 0; i < maxCount; i++) {
			if (i === maxCount - 1) {
				await safeAddGamePoints(user.id, mockId(), false);
				const totalGamePointsToday = await getTotalGamePointsToday(user.id);
				const points = await safeAddGamePoints(user.id, mockId(), true);
				expect(points).toEqual(MAX_GAME_POINTS_PER_DAY - totalGamePointsToday);
			} else {
				const points = await safeAddGamePoints(user.id, mockId(), true);
				expect(points).toEqual(WINNER_POINTS);
			}
		}
	});
});
