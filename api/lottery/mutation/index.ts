import type { IInventory } from 'models/inventory';
import { Inventory } from 'models/inventory';
import type { IItem } from 'models/item';
import { Item, ItemType } from 'models/item';
import { PointTransactionLog, TransactionType } from 'models/pointTransaction';
import { User } from 'models/user';
import { ClientError, SystemError } from 'utils/errors';
import { GetSert } from 'utils/mongo';
import type { MutationResolvers } from 'utils/types';

// This price is just a fallback value incase we could not retrieve it from the database
// this value should be stored in metadata field of lottery item
const lotteryFallbackPrice = 250;

export const purchaseLottery: MutationResolvers['purchaseLottery'] = async (
	root,
	_,
	{ user },
) => {
	const systemLotteryInfo = await GetSert<IItem>(
		Item,
		{ type: ItemType.LOTTERY },
		{
			type: ItemType.LOTTERY,
			metadata: {
				price: lotteryFallbackPrice,
			},
			remainAmount: 10,
		},
	);
	// TODO: remove this
	if (systemLotteryInfo == undefined) {
		throw new SystemError('failed to get system lottery info');
	}

	let lotteryPrice: number;
	if (systemLotteryInfo.metadata.price == undefined) {
		console.log('lottery price is missing, use default price');
		lotteryPrice = lotteryFallbackPrice;
	} else {
		lotteryPrice = Number(systemLotteryInfo.metadata.price);
	}

	if (user.points == undefined) {
		throw new SystemError('could not retrieve point of user');
	}

	if (user.points < lotteryPrice) {
		throw new ClientError('user have no enough point');
	}

	if (systemLotteryInfo.remainAmount == 0) {
		throw new SystemError('system have no enough lottery');
	}

	// first, insert the transaction
	const insertResponse = await PointTransactionLog.findOneAndUpdate(
		{ userId: user.id },
		{
			$push: {
				transactions: {
					type: TransactionType.PURCHASELOTTERY,
					amount: -lotteryPrice,
				},
			},
		},
		{ upsert: true, new: true },
	);
	if (insertResponse == undefined) {
		throw new SystemError('failed to update user point transaction');
	}

	// second, update the point of user
	const updateResponse = await User.updateOne(
		{ _id: user.id },
		{ $inc: { points: -lotteryPrice } },
	);

	if (!updateResponse.acknowledged) {
		throw new SystemError('failed to update user point');
	}

	// third, update the remain ticket of the system
	try {
		decreaseSystemLotteryAmount(systemLotteryInfo);
	} catch (err) {
		console.log('failed to decrase system lottery amount', err);
		throw new SystemError('failed to decrase system lottery amount');
	}

	// finnaly, update ticket number in inventory
	await GetSert<IInventory>(
		Inventory,
		{ userId: user.id },
		{
			userId: user.id,
			items: [
				{
					itemId: systemLotteryInfo.id,
					amount: 0,
				},
			],
		},
	);

	const increaseResponse = await Inventory.updateOne(
		{ userId: user.id, 'items.itemId': systemLotteryInfo.id },
		{ $inc: { 'items.$.amount': 1 } },
	);

	if (!increaseResponse.acknowledged) {
		throw new SystemError('failec to update user inventory');
	}

	const tx =
		insertResponse.transactions[insertResponse.transactions.length - 1];
	const result = {
		type: tx.type,
		id: tx.id,
		amount: tx.amount,
		userId: user.id,
		purchaseAt: tx.createdAt,
	} as never;
	console.log(result);
	return result;
};

export const openLottery: MutationResolvers['openLottery'] = async (
	root,
	_,
	{ user },
) => {
	console.log('openLottery');
	return {
		id: 'id' + user.id,
		userId: 'id' + user.id,
		items: [
			{
				id: 'itemid',
				quantity: 10,
				type: ItemType.CHEST,
			},
		],
	};
};

const decreaseSystemLotteryAmount = async (systemLotteryInfo: IItem) => {
	if (systemLotteryInfo.remainAmount < 0) {
		// skip this case, since we don't limited system lottery
		return;
	}

	const decreaseResponse = await Item.updateOne(
		{ _id: systemLotteryInfo.id, type: ItemType.LOTTERY },
		{ $inc: { remainAmount: -1 } },
	);

	// TODO: find way to update nested field of document
	// TODO: find way to respond error in this
	if (!decreaseResponse.acknowledged) {
		throw Error('failed to decreaseSystemLotteryAmount');
	}
	return;
};
