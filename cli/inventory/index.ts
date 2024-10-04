import fs from 'fs';
import path from 'path';

import type { IUser } from '@underrealm/api';
import { Inventory, Item, ItemType, User } from '@underrealm/api';
import yargs from 'yargs';

import { connectToMongoDB, disconnectToMongoDB } from '../utils/mongo';
import type { StrictCommandModule } from '../utils/types';

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
	address?: string;
	email?: string;
	item: string;
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
		const csvFilePath = path.resolve(args.configurationFile);

		let fileContent: string;
		try {
			fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
		} catch (err) {
			console.log(`failed to read config file\n${err}`);
			return;
		}

		const rewardRows: ConfigurationFileRow[] = JSON.parse(fileContent);
		await connectToMongoDB();

		await Promise.all(
			rewardRows.map(async (row, index) => {
				if (row.amount <= 0) {
					throw new Error('amount must be greater than zero');
				}
				const itemType = row.item;
				if (!Object.values(ItemType).findIndex((row) => row == itemType)) {
					console.error(`invalid itemType found on row ${index}: ${row.item}`);
					return;
				}

				let user: IUser;
				if (row.email) {
					user = await User.findOne({ email: row.email });
				} else if (row.address) {
					user = await User.findOne({ address: row.address });
				} else {
					console.error('invalid addressType, should be  email or wallet');
					return;
				}
				if (user == undefined) {
					console.error(`invalid user, user not existed ${row.address}`);
					return;
				}

				const itemInfo = await Item.findOne({
					type: itemType,
				});
				if (itemInfo == undefined) {
					console.error('system item not found');
					return;
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
					if (response.modifiedCount == 0 && response.upsertedCount == 0) {
						console.error('failed to update inventory item');
						return;
					}
				}
				console.log('success');
			}),
		).then(async () => {
			await disconnectToMongoDB();
		});
	},
};
