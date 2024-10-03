import { Quest } from '@underrealm/api';
import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import type { StrictCommandModule } from 'utils/types';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';

export const questCommand: StrictCommandModule<object, unknown> = {
	command: 'quest',
	describe: 'Working with quests',
	builder: (yargs) => {
		return yargs
			.command(createQuestCommand)
			.command(updateQuestCommand)
			.command(deleteQuestCommand)
			.demandCommand(1, 'You must specify a valid subcommand.');
	},
	handler: () => {
		yargs.showHelp();
	},
};

enum QuestTypes {
	LIKE_X = 'LIKE_X',
	RETWEET_X = 'RETWEET_X',
	COMMENT_X = 'COMMENT_X',
	FOLLOW_X = 'FOLLOW_X',
	CHAT_DISCORD = 'CHAT_DISCORD',
	JOIN_DISCORD = 'JOIN_DISCORD',
}

enum QuestStatuses {
	INIT = 'INIT',
	LIVE = 'LIVE',
	DISABLED = 'DISABLED',
}

type CreateArgs = {
	interactive: boolean;
	title: string;
	description: string;
	type: QuestTypes;
	url: string;
	points: number;
};

const createQuestCommand: StrictCommandModule<object, CreateArgs> = {
	command: 'create',
	describe: 'Create new quests',
	builder: {
		interactive: {
			alias: 'i',
			type: 'boolean',
			describe: 'interactively add a new quest instead JSON config file',
			default: false,
		},
		title: {
			describe: 'The title of the quest',
			type: 'string',
		},
		description: {
			describe: 'The description of the quest',
			type: 'string',
		},
		type: {
			describe: 'The type of the quest',
			type: 'string',
			choices: Object.values(QuestTypes),
		},
		url: {
			describe: 'The link to the quest',
			type: 'string',
		},
		points: {
			describe: 'The points of the quest',
			type: 'number',
		},
	},
	handler: async (args) => {
		await connectToMongoDB();

		if (args.interactive) {
			const questions: PromptObject[] = questFieldQuestions([
				'title',
				'description',
				'type',
				'url',
				'points',
			]);
			const quest = await prompts(questions);

			const createdQuest = await Quest.create(quest);
			console.log(JSON.stringify(createdQuest, null, '\t'));
		} else {
			console.log('create quests by flags');
			const createdQuest = await Quest.create(args);
			console.log(JSON.stringify(createdQuest, null, '\t'));
		}

		console.log('Create quest successfully');
		await disconnectToMongoDB();
	},
};

type UpdateArgs = {
	id?: string;
	title?: string;
	description?: string;
	type?: QuestTypes;
	status?: QuestStatuses;
	url?: string;
	points?: number;
	code?: string;
};

const updateQuestCommand: StrictCommandModule<object, UpdateArgs> = {
	command: 'update',
	describe: 'Update a quest by id or multiple quests by status',
	builder: {
		interactive: {
			alias: 'i',
			type: 'boolean',
			describe: 'interactively update a quest instead JSON config file',
			default: false,
		},
		id: {
			describe: 'The id of the quest',
			type: 'string',
		},
		title: {
			describe: 'The title of the quest',
			type: 'string',
		},
		description: {
			describe: 'The description of the quest',
			type: 'string',
		},
		type: {
			describe: 'The type of the quest',
			type: 'string',
			choices: Object.values(QuestTypes),
		},
		status: {
			describe: 'The status of the quest',
			type: 'string',
			choices: Object.values(QuestStatuses),
		},
		url: {
			describe: 'The link to the quest',
			type: 'string',
		},
		points: {
			describe: 'The points of the quest',
			type: 'number',
		},
		code: {
			describe: 'The unique code of the quest',
			type: 'string',
		},
	},
	handler: async (args) => {
		await connectToMongoDB();

		if (args.code) {
			console.log('Update quest with code\n', args.code);
			const { code, ...fields } = args;
			const updatedQuest = await Quest.findOneAndUpdate({ code }, fields, {
				new: true,
			});
			console.log(JSON.stringify(updatedQuest, null, '\t'));
		} else if (args.interactive) {
			console.log('Update the chosen quest', args);

			const questList = await Quest.find();
			const questChoices = questList.map((quest) => ({
				title: `${quest.title} - Code: ${quest.code} - Description: ${quest.description} - Type: ${quest.type} - Status: ${quest.status} - Points: ${quest.points}`,
				value: quest._id,
			}));

			const chosenQuest: PromptObject[] = [
				{
					type: 'select',
					name: 'id',
					message: 'Choose quest to update',
					choices: questChoices,
				},
			];
			const { id } = await prompts(chosenQuest);

			const fieldQuestions: PromptObject[] = [
				{
					type: 'multiselect',
					name: 'fields',
					message: 'Which fields do you want to update?',
					choices: [
						{ title: 'Title', value: 'title' },
						{ title: 'Description', value: 'description' },
						{ title: 'Type', value: 'type' },
						{ title: 'Status', value: 'status' },
						{ title: 'URL', value: 'url' },
						{ title: 'Points', value: 'points' },
					],
				},
			];
			const { fields: fieldNames } = await prompts(fieldQuestions);

			const questions: PromptObject[] = questFieldQuestions(fieldNames);
			const fields = await prompts(questions);

			const updatedQuest = await Quest.findByIdAndUpdate(id, fields, {
				new: true,
			});
			console.log(JSON.stringify(updatedQuest, null, '\t'));
		}

		console.log('Update quest successfully');
		await disconnectToMongoDB();
	},
};

type DeleteArgs = {
	id: string;
	code: string;
};

const deleteQuestCommand: StrictCommandModule<object, DeleteArgs> = {
	command: 'delete',
	describe: 'Delete a quest by id',
	builder: {
		id: {
			describe: 'The id of the quest',
			type: 'string',
		},
		code: {
			describe: 'The unique code of the quest',
			type: 'string',
		},
		interactive: {
			alias: 'i',
			type: 'boolean',
			describe: 'interactively delete a quest instead JSON config file',
			default: false,
		},
	},
	handler: async (args) => {
		await connectToMongoDB();

		if (args.interactive) {
			const questList = await Quest.find();
			const questChoices = questList.map((quest) => ({
				title: `${quest.title} - Code: ${quest.code} - Description: ${quest.description} - Type: ${quest.type} - Status: ${quest.status} - Points: ${quest.points}`,
				value: quest._id,
			}));
			const questions: PromptObject[] = [
				{
					type: 'select',
					name: 'id',
					message: 'Which quest do you want to delete?',
					choices: questChoices,
				},
			];

			const { id } = await prompts(questions);

			const deletedQuest = await Quest.findByIdAndDelete(id);
			console.log(JSON.stringify(deletedQuest, null, '\t'));
		} else if (args.id) {
			console.log('Delete quest by id', args.id);
			const deletedQuest = await Quest.findByIdAndDelete(args.id);
			console.log(JSON.stringify(deletedQuest, null, '\t'));
		} else if (args.code) {
			console.log('Delete quest by code', args.code);
			const deletedQuest = await Quest.findOneAndDelete({ code: args.code });
			console.log(JSON.stringify(deletedQuest, null, '\t'));
		}

		console.log('Delete quest successfully');
		await disconnectToMongoDB();
	},
};

type FieldKey = 'title' | 'description' | 'type' | 'status' | 'url' | 'points';

function questFieldQuestions(fields: FieldKey[]): PromptObject[] {
	return fields
		.map((field) => {
			switch (field) {
				case 'title':
					return {
						type: 'text',
						name: 'title',
						message: 'Quest Title?',
					};
				case 'description':
					return {
						type: 'text',
						name: 'description',
						message: 'Quest Description?',
					};
				case 'type':
					return {
						type: 'select',
						name: 'type',
						message: 'Quest type?',
						choices: Object.values(QuestTypes).map((q) => ({
							title: q,
							value: q,
						})),
					};
				case 'status':
					return {
						type: 'select',
						name: 'status',
						message: 'Quest status?',
						choices: Object.values(QuestStatuses).map((q) => ({
							title: q,
							value: q,
						})),
					};
				case 'url':
					return {
						type: 'text',
						name: 'url',
						message: 'Quest URL?',
					};
				case 'points':
					return {
						type: 'number',
						name: 'points',
						message: 'Quest points?',
					};
				default:
					return null;
			}
		})
		.filter(Boolean) as PromptObject[];
}
