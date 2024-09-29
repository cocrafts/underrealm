import type { IInventory } from 'models/inventory';
import { Inventory } from 'models/inventory';
import { GetSert } from 'utils/mongo';
import type { QueryResolvers } from 'utils/types';

const inventory: QueryResolvers['inventory'] = async (root, _, { user }) => {
	return await GetSert<IInventory>(
		Inventory,
		{ userId: user.id },
		{
			userId: user.id,
			items: [],
		},
	);
};

export const InventoryQueryResolvers = { inventory };
