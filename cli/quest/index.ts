import type { PromptObject } from 'prompts';
import prompts from 'prompts';
import type { StrictCommandModule } from 'utils/graphql';
import yargs from 'yargs';

export const questCommand: StrictCommandModule<object, unknown> = {
	command: 'quest',
	describe: 'Working with quests',
	builder: (yargs) => {
		return yargs
			.command(createQuest)
			.command(updateQuest)
			.command(deleteQuest)
			.demandCommand(1, 'You must specify a valid subcommand.');
	},
	handler: () => {
		yargs.showHelp();
	},
};

type CreateArgs = {
	interactive: boolean;
};

const createQuest: StrictCommandModule<object, CreateArgs> = {
	command: 'create',
	describe: 'Create new quests',
	builder: (yargs) => {
		return yargs.option('interactive', {
			alias: 'i',
			type: 'boolean',
			describe: 'interactively add a new quest instead JSON config file',
			default: false,
		});
	},
	handler: async (args) => {
		if (args.interactive) {
			const questions: PromptObject[] = [
				{
					type: 'select',
					name: 'type',
					message: 'Quest type?',
					choices: [
						{ title: 'LIKE_X' },
						{ title: 'RETWEET_X' },
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
			console.log('Created quest', response);
			// create a new quest to database
			// update the config file to sync this new quest
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
	type?: 'LIKE_X' | 'RETWEET_X' | 'JOIN_DISCORD';
	status?: 'INIT' | 'LIVE' | 'DISABLED';
	url?: string;
};

const updateQuest: StrictCommandModule<object, UpdateArgs> = {
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

const deleteQuest: StrictCommandModule<object, DeleteArgs> = {
	command: 'delete <id>',
	describe: 'Delete a quest by id',
	handler: (args) => {
		console.log('delete quest by id', args.id);
	},
};
