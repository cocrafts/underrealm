import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import type { StrictCommandModule } from 'utils/types';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';

import {
	createQuest,
	deleteQuest,
	updateQuest,
	updateQuestStatus,
} from './mutation';
import { getQuestList } from './query';

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
	title?: string;
	description?: string;
	type?: 'LIKE_X' | 'RETWEET_X' | 'COMMENT_X' | 'JOIN_DISCORD';
	status?: 'INIT' | 'LIVE' | 'DISABLED';
	url?: string;
	points?: number;
};

const questStatus = ['INIT', 'LIVE', 'DISABLED'];

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
	},
	handler: async (args) => {
		await connectToMongoDB();
		if (args.status) {
			console.log('update all quests by status\n', args);
			// update all quests by status
			// update the config file to sync this new quest
			const questList = await getQuestList();
			const questChoices = questList.map((quest) => ({
				title: `${quest.title} - Description: ${quest.description} - Type: ${quest.type} - Status: ${quest.status} - Points: ${quest.points}`,
				value: quest._id,
			}));
			const questions: PromptObject[] = [
				{
					type: 'multiselect',
					name: 'ids',
					message: 'Choose quests to update',
					choices: questChoices,
				},
			];
			const response = await prompts(questions);
			const { ids } = response;
			if (ids && ids.length > 0) {
				for (const id of ids) {
					await updateQuestStatus(id, args.status);
				}
				console.log('Update quests successfully');
			} else {
				console.log('No quests selected.');
			}
			await disconnectToMongoDB();
		} else if (args.interactive) {
			console.log('update the chosen quest', args);
			const questList = await getQuestList();
			const questChoices = questList.map((quest) => ({
				title: `${quest.title} - Description: ${quest.description} - Type: ${quest.type} - Status: ${quest.status} - Points: ${quest.points}`,
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

			const questions: PromptObject[] = fields
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
				.filter(Boolean);

			const response = await prompts(questions);
			const { title, description, type, status, url, points } = response;

			await updateQuest({
				id,
				title,
				description,
				type: type !== undefined ? questTypes[type] : undefined,
				status: status !== undefined ? questStatus[status] : undefined,
				url,
				points,
			});

			console.log('Update quest successfully');
			// update the quest by id
			// update the config file to sync this new quest
			await disconnectToMongoDB();
		} else {
			console.log('update all available quests from JSON file', args);
		}
	},
};

type DeleteArgs = {
	id: string;
};

const deleteQuestCommand: StrictCommandModule<object, DeleteArgs> = {
	command: 'delete',
	describe: 'Delete a quest by id',
	builder: {
		id: {
			describe: 'The id of the quest',
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
			const idQuestion: PromptObject = {
				type: 'text',
				name: 'id',
				message: 'Quest ID?',
			};

			const { id } = await prompts(idQuestion);

			await deleteQuest(id);

			console.log('Delete quest successfully');
			// delete the quest by id
			// update the config file to sync this new quest
			await disconnectToMongoDB();
		} else {
			console.log('delete quest by id', args.id);
			await deleteQuest(args.id);
			console.log('Delete quest successfully');
			await disconnectToMongoDB();
		}
	},
};
