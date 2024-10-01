import { Inventory } from 'models/inventory';
import { virtualId } from 'models/utils';
import type { Document } from 'mongoose';
import type { QueryResolvers } from 'utils/types';

const inventory: QueryResolvers['inventory'] = async (root, _, { user }) => {
	const userWithObjectId = virtualId(user);
	let userInventory = await Inventory.findOne({
		userId: userWithObjectId.id,
	})
		.populate('items.itemId')
		.exec();
	if (userInventory == undefined) {
		userInventory = await Inventory.create({
			userId: userWithObjectId.id,
			items: [],
		});
	}
	const itemsDetails = userInventory.items.map((val) => {
		const item = (val as unknown as Document).toObject();
		const itemDetail = (val.itemId as unknown as Document).toObject();
		return {
			...item,
			...itemDetail,
			itemId: itemDetail.id,
		};
	});
	const result = {
		id: userInventory.id,
		userId: user.id,
		items: itemsDetails,
	} as never;
	return result;
};

export const InventoryQueryResolvers = { inventory };
