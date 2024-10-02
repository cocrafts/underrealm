import { Inventory } from 'models/asset';
import { virtualId } from 'models/utils';
import { SystemError } from 'utils/errors';
import { logger } from 'utils/logger';
import { isObjectId } from 'utils/mongo';
import type { QueryResolvers } from 'utils/types';

export const inventory: QueryResolvers['inventory'] = async (
	root,
	_,
	{ user },
) => {
	const userWithObjectId = virtualId(user);
	let userInventory = await Inventory.findOne({
		userId: userWithObjectId.id,
	})
		.populate('items.itemId')
		.exec();
	if (!userInventory) {
		userInventory = await Inventory.create({
			userId: userWithObjectId.id,
			items: [],
		});
	}
	const itemsDetails = userInventory.items.map((val) => {
		const item = val;
		const itemDetail = val.itemId;
		if (isObjectId(itemDetail)) {
			const msg = 'received invalid populated data from inventory';
			logger.info(msg);
			throw new SystemError(msg);
		}
		return {
			amount: item.amount,
			type: itemDetail.type,
			metadata: itemDetail.metadata,
			itemId: itemDetail.id,
		};
	});

	return {
		id: userInventory.id,
		userId: user.id,
		items: itemsDetails,
	};
};
