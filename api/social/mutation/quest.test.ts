import { Types } from 'mongoose';
import type { ApiContext } from 'utils/runtime';

import { Quest } from '../../models/quest';
import { User } from '../../models/user';
import { clearDatabase, connectToTestDB, disconnectTestDB } from '../mongoTest';

import type { CreateQuestActionMutationVariables } from './../../../launcher/utils/graphql/sdk';
import { createQuestAction } from './quest';

const ObjectId = Types.ObjectId;

describe('Test createQuestAction resolver for users to claim points', () => {
	beforeAll(async () => {
		await connectToTestDB();
	});

	afterAll(async () => {
		await clearDatabase();
		await disconnectTestDB();
	});

	beforeEach(async () => {
		await Quest.create({
			_id: '60df37899db1b9adbdcb38e6',
			title: 'Test Quest',
			points: 50,
			questActions: [],
		});

		await User.create({
			bindingId: 'user123',
			name: 'Test User',
			questActions: [],
		});
	});

	it('should create a quest action that contain the exact information from test quest and test user', async () => {
		const input: CreateQuestActionMutationVariables = {
			questId: '60df37899db1b9adbdcb38e6',
		};

		const mockContext: ApiContext = { user: { id: 'user123' }, client: {} };

		const result = await createQuestAction(null, input, mockContext);

		expect(result.quest).toEqual(new ObjectId('60df37899db1b9adbdcb38e6'));
		expect(result.user).toBe('user123');
		expect(result.claimedPoints).toBe(50);
	});
});
