import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import type { StrictCommandModule } from 'utils/types';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';

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
		}
	},
};

type UpdateArgs = {
	id?: string;
	type?: 'LIKE_X' | 'RETWEET_X' | 'COMMENT_X' | 'JOIN_DISCORD';
	status?: 'INIT' | 'LIVE' | 'DISABLED';
	url?: string;
};

const updateQuestCommand: StrictCommandModule<object, UpdateArgs> = {
	command: 'update <id|status>',
	describe: 'Update a quest by id or multiple quests by status',
	handler: (args) => {
		if (args.id) {
			console.log('update quest by id', args);
		} else {
			console.log('update all available quests from JSON file', args);
		}
	},
};

type DeleteArgs = {
	id: string;
};

const deleteQuestCommand: StrictCommandModule<object, DeleteArgs> = {
	command: 'delete <id>',
	describe: 'Delete a quest by id',
	handler: (args) => {
		console.log('delete quest by id', args.id);
	},
};
