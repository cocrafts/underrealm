import { ItemType } from 'models/asset';
import { randInt } from 'utils/common';

import { calculateUserReward, getRewardByRate } from '.';
describe('Random Reward Logic', () => {
	const rewards = [
		{ type: ItemType.CHEST_GOLD, rate: 0.5 },
		{ type: ItemType.CHEST_LIGHT, rate: 0.6 },
		{ type: ItemType.CHEST_WOODEN, rate: 1 },
	];

	test('getRandomNumber should return a number between 0 and 1', () => {
		const randomNumber = randInt(0, 100) / 100;
		expect(randomNumber).toBeGreaterThanOrEqual(0);
		expect(randomNumber).toBeLessThanOrEqual(1);
	});

	test('calculateUserReward should return the correct reward based on random number', () => {
		expect(getRewardByRate(0.3, rewards).type).toBe(ItemType.CHEST_GOLD); // 0.3 <= 0.5
		expect(getRewardByRate(0.55, rewards).type).toBe(ItemType.CHEST_LIGHT); // 0.55 > 0.5 and <= 0.6
		expect(getRewardByRate(0.7, rewards).type).toBe(ItemType.CHEST_WOODEN); // 0.7 > 0.6 and <= 1
		expect(getRewardByRate(0.99, rewards).type).toBe(ItemType.CHEST_WOODEN); // 0.99 <= 1
	});

	test('Random rewards follow the rate distribution', () => {
		const counts = {
			[ItemType.CHEST_GOLD]: 0,
			[ItemType.CHEST_LIGHT]: 0,
			[ItemType.CHEST_WOODEN]: 0,
		};
		const iterations = 100000;

		for (let i = 0; i < iterations; i++) {
			const randomNumber = randInt(0, 100) / 100;
			const reward = calculateUserReward(rewards, randomNumber);
			counts[reward.type]++;
		}
		// Validate the proportions (roughly 50%, 10%, and 40%)
		const ratioA = counts[ItemType.CHEST_GOLD] / iterations;
		const ratioB = counts[ItemType.CHEST_LIGHT] / iterations;
		const ratioC = counts[ItemType.CHEST_WOODEN] / iterations;

		// Allow some tolerance because it's based on randomness
		expect(ratioA).toBeCloseTo(0.5, 1); // Within 10% range
		expect(ratioB).toBeCloseTo(0.1, 1); // Within 10% range
		expect(ratioC).toBeCloseTo(0.4, 1); // Within 10% range
	});
});
