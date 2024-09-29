import { Inventory } from 'models/inventory';
import { virtualId } from 'models/utils';
import type { QueryResolvers } from 'utils/types';

const inventory: QueryResolvers['inventory'] = async (root, _, { user }) => {
	const userWithObjectId = virtualId(user);
	let userInventory = await Inventory.findOne({
		userId: userWithObjectId.id,
	});
	if (userInventory == undefined) {
		userInventory = await Inventory.create({
			userId: userWithObjectId.id,
			items: [],
		});
	}
	return userInventory as never;
};

export const InventoryQueryResolvers = { inventory };
