import * as fs from 'fs';
import * as path from 'path';

import { parse } from 'csv-parse';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';

import type { IUser } from './../user/model';
import { User } from './../user/model';
import type { StrictCommandModule } from './../utils/types';
import { Inventory, Item, ItemType } from './model';
export const inventoryCommand: StrictCommandModule<object, unknown> = {
	command: 'inventory',
	describe: 'Working with inventory system',
	builder: (yargs) => {
		return yargs
			.command(updateUserInventoryCommand)
			.demandCommand(1, 1, 'You must choose 1 command');
	},
	handler: () => {
		yargs.showHelp();
	},
};

interface ConfigurationFileRow {
	address: string;
	addressType: string;
	itemType: string;
	amount: number;
}

type UpdateInventoryArgs = {
	configurationFile: string;
};
const updateUserInventoryCommand: StrictCommandModule<
	object,
	UpdateInventoryArgs
> = {
	command: 'update',
	describe: "update user's inventory",
	builder: {
		configurationFile: {
			alias: 'config',
			type: 'string',
			describe: 'path to the csv file containing the update content',
		},
	},
	handler: async (args) => {
		if (args.configurationFile == '') {
			console.log('configuration field should not be empty');
			return;
		}
		const headers = ['address', 'addressType', 'itemType', 'amount'];
		const csvFilePath = path.resolve(args.configurationFile);

		let fileContent: string;
		try {
			fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
		} catch (err) {
			console.log(`failed to read config file\n${err}`);
			return;
		}

		try {
			parse(
				fileContent,
				{ autoParse: true, delimiter: ',', columns: headers, from_line: 2 },
				async (error, result: ConfigurationFileRow[]) => {
					await connectToMongoDB();
					if (error) {
						console.error(error);
					}
					for (const [index, row] of Object.entries(result)) {
						if (row.amount <= 0) {
							throw new Error('amount must be greater than zero');
						}
						const itemType = row.itemType as ItemType;
						if (!Object.values(ItemType).findIndex((row) => row == itemType)) {
							console.error(
								`invalid itemType found on row ${index}: ${row.itemType}`,
							);
							return;
						}

						let user: IUser;
						if (row.addressType == 'email') {
							user = await User.findOne({ email: row.address });
						} else if (row.addressType == 'wallet') {
							user = await User.findOne({ address: row.address });
						} else {
							console.error('invalid addressType, should be  email or wallet');
							break;
						}
						if (user == undefined) {
							console.error(`invalid user, user not existed ${row.address}`);
							break;
						}

						const itemInfo = await Item.findOne({
							type: itemType,
						});
						if (itemInfo == undefined) {
							console.error('system item not found');
							break;
						}
						const updateResponse = await Inventory.updateOne(
							{ userId: user.id, 'items.itemId': itemInfo.id },
							{ $inc: { 'items.$.amount': row.amount } },
						);
						if (updateResponse.modifiedCount == 0) {
							// user's don't have item, push a new one
							const response = await Inventory.updateOne(
								{ userId: user.id },
								{
									$push: { items: { itemId: itemInfo.id, amount: row.amount } },
								},
								{ upsert: true },
							);
							if (response.modifiedCount == 0 && response.upsertedCount) {
								console.error('failed to update inventory item');
								break;
							}
						}
						console.log('success');
					}
					await disconnectToMongoDB();
				},
			);
		} catch (err) {
			console.log('failded to parse the configuration file', err);
		}
	},
};
