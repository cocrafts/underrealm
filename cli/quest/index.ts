import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import type { StrictCommandModule } from 'utils/types';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';

import { Quest } from './model';
import { createQuest } from './mutation';

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

type CreateArgs = {
	interactive: boolean;
	title: string;
	description: string;
	type: 'LIKE_X' | 'RETWEET_X' | 'COMMENT_X' | 'JOIN_DISCORD';
	url: string;
	points: number;
};

const questTypes = ['LIKE_X', 'RETWEET_X', 'COMMENT_X', 'JOIN_DISCORD'];

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
			choices: questTypes,
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
			const questions: PromptObject[] = [
				{
					type: 'text',
					name: 'title',
					message: 'Quest Title?',
				},
				{
					type: 'text',
					name: 'description',
					message: 'Quest Description?',
				},
				{
					type: 'select',
					name: 'type',
					message: 'Quest type?',
					choices: [
						{ title: 'LIKE_X' },
						{ title: 'RETWEET_X' },
						{ title: 'COMMENT_X' },
						{ title: 'JOIN_DISCORD' },
					],
				},
				{
					type: 'text',
					name: 'url',
					message: 'Quest URL?',
				},
				{
					type: 'number',
					name: 'points',
					message: 'Quest points?',
				},
			];

			const response = await prompts(questions);
			const { title, description, url, points, type } = response;

			await createQuest({
				title,
				description,
				url,
				points,
				type: questTypes[type],
			});

			console.log('Create quest successfully');
			// create a new quest to database
			// update the config file to sync this new quest
			await disconnectToMongoDB();
		} else {
			console.log('create quests from JSON file');
			// Read `config.{env}.json` file, loop over quest object,
			// if the quest has no id, create a new quest in database, then update the config.
			// And write to JSON file
			const { title, description, type, url, points } = args;
			await createQuest({
				title,
				description,
				type,
				url,
				points,
			});
			console.log('Create quest successfully');
			await disconnectToMongoDB();
		}
	},
};

type UpdateArgs = {
	id?: string;
	title?: string;
	description?: string;
	type?: 'LIKE_X' | 'RETWEET_X' | 'COMMENT_X' | 'JOIN_DISCORD';
	status?: 'INIT' | 'LIVE' | 'DISABLED';
	url?: string;
	points?: number;
	code?: string;
};

const statusTypes = ['INIT', 'LIVE', 'DISABLED'];

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
			choices: questTypes,
		},
		status: {
			describe: 'The status of the quest',
			type: 'string',
			choices: ['INIT', 'LIVE', 'DISABLED'],
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

			const { code, title, description, type, status, url, points } = args;
			await Quest.findOneAndUpdate(
				{ code },
				{
					title,
					description,
					type: questTypes[type],
					status: statusTypes[status],
					url,
					points,
				},
			);

			await disconnectToMongoDB();
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

			const initialQuestions: PromptObject[] = [
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

			const initialResponse = await prompts(initialQuestions);
			const { fields } = initialResponse;

			const questions: PromptObject[] = updateQuestions(fields);

			const response = await prompts(questions);
			const { title, description, type, status, url, points } = response;

			await Quest.findByIdAndUpdate(id, {
				title,
				description,
				type: questTypes[type],
				status: statusTypes[status],
				url,
				points,
			});

			console.log('Update quest successfully');
			await disconnectToMongoDB();
		}
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

			await Quest.findByIdAndDelete(id);

			console.log('Delete quest successfully');

			await disconnectToMongoDB();
		} else if (args.id) {
			console.log('Delete quest by id', args.id);

			await Quest.findByIdAndDelete(args.id);

			console.log('Delete quest successfully');

			await disconnectToMongoDB();
		} else if (args.code) {
			console.log('Delete quest by code', args.code);

			await Quest.findOneAndDelete({ code: args.code });

			console.log('Delete quest successfully');

			await disconnectToMongoDB();
		}
	},
};

function updateQuestions(fields: string[]): PromptObject[] {
	return fields
		.map((field: string) => {
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
						choices: [
							{ title: 'LIKE_X' },
							{ title: 'RETWEET_X' },
							{ title: 'COMMENT_X' },
							{ title: 'JOIN_DISCORD' },
						],
					};
				case 'status':
					return {
						type: 'select',
						name: 'status',
						message: 'Quest status?',
						choices: [
							{ title: 'INIT' },
							{ title: 'LIVE' },
							{ title: 'DISABLED' },
						],
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
