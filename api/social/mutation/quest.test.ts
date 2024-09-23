import { Quest } from 'models/quest';
import { User } from 'models/user';
import { Types } from 'mongoose';
import {
	clearDatabase,
	connectToTestDB,
	disconnectTestDB,
} from 'utils/mongoTestingServer';
import type { Resolver } from 'utils/types';

import { createQuestAction } from './quest';

const ObjectId = Types.ObjectId;

let quest;
let user;

describe('Test createQuestAction resolver for users to claim points', () => {
	beforeAll(async () => {
		await connectToTestDB();
	});

	afterAll(async () => {
		await clearDatabase();
		await disconnectTestDB();
	});

	beforeEach(async () => {
		quest = await Quest.create({
			title: 'Test Quest',
			points: 50,
		});

		user = await User.create({
			bindingId: 'user123',
			name: 'Test User',
			referralCode: 'a1b2c3',
		});
	});

	it('should create a quest action that contain the exact information from test quest and test user', async () => {
		const input = {
			questId: quest.id,
		};

		const mockContext = { user, client: {} };

		const resolver = extractResolverFn(createQuestAction);

		const result = await resolver(null, input, mockContext, {} as never);

		expect(result.questId).toEqual(new ObjectId(quest.id));
		expect(result.userId).toEqual(new ObjectId(user.id));
		expect(result.claimedPoints).toBe(50);
	});
});

const extractResolverFn = <T1, T2, T3, T4>(
	resolver: Resolver<T1, T2, T3, T4>,
) => {
	if (typeof resolver === 'function') return resolver;
	return resolver.resolve;
};
