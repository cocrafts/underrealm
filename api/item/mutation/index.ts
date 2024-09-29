import type { IInventory } from 'models/inventory';
import { Inventory } from 'models/inventory';
import type { IItem } from 'models/item';
import { Item } from 'models/item';
import { PointTransactionLog, TransactionType } from 'models/pointTransaction';
import { User } from 'models/user';
import { virtualId } from 'models/utils';
import { type Document, type Types } from 'mongoose';
import {
	DEFAULT_SYSTEM_ITEMS,
	ItemType,
	LOTTERY_DEFAULT_PRICE,
	LOTTERY_REWARD_CHANCE,
	LOTTERY_REWARD_RATE,
	randInt,
} from 'utils/common';
import { ClientError, SystemError } from 'utils/errors';
import { GetSert } from 'utils/mongo';
import type { MutationResolvers } from 'utils/types';

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
				price: LOTTERY_DEFAULT_PRICE,
			},
			remainAmount: -1,
		},
	);
	// TODO: remove this
	if (systemLotteryInfo == undefined) {
		throw new SystemError('failed to get system lottery info');
	}

	let lotteryPrice: number;
	if (systemLotteryInfo.metadata.price == undefined) {
		console.log('lottery price is missing, use default price');
		lotteryPrice = LOTTERY_DEFAULT_PRICE;
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
		{ userId: virtualId(user).id },
		{
			userId: virtualId(user).id,
			items: [
				{
					itemId: virtualId(systemLotteryInfo).id,
					amount: 0,
				},
			],
		},
	);

	let increaseResponse = await Inventory.updateOne(
		{ userId: user.id, 'items.itemId': systemLotteryInfo.id },
		{ $inc: { 'items.$.amount': 1 } },
	);

	if (increaseResponse.modifiedCount == 0) {
		increaseResponse = await Inventory.updateOne(
			{ userId: user.id },
			{
				$push: {
					items: {
						itemId: virtualId(systemLotteryInfo).id,
						amount: 1,
					},
				},
			},
		);
		if (increaseResponse.modifiedCount == 0) {
			throw new SystemError('failec to update user inventory');
		}
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
	return result;
};

export const openLottery: MutationResolvers['openLottery'] = async (
	root,
	_,
	{ user },
) => {
	const reward_types = Object.keys(LOTTERY_REWARD_CHANCE);
	const local_reward_rate = LOTTERY_REWARD_RATE;
	const userObjectId = virtualId(user).id;
	// first, check if user's inventory include lottery ticket
	let userInventory = await Inventory.findOne({ userId: user.id })
		.populate('items.itemId')
		.exec();
	if (userInventory == undefined) {
		userInventory = await Inventory.create({
			userId: userObjectId,
			items: [],
		});
		throw new ClientError('user has no ticket');
	}
	const userLottery = userInventory.items
		.filter(
			(val) =>
				// PERF: clean this
				((val.itemId as unknown as IItem).type as ItemType) == ItemType.LOTTERY,
		)
		.at(0);
	if (userLottery == undefined || userLottery.amount == 0) {
		throw new ClientError('user has no lottery ticket');
	}

	// second, check system available reward
	let rewardsSystemInfo = await Item.find({
		type: { $in: reward_types },
	});

	if (rewardsSystemInfo.length != reward_types.length) {
		try {
			rewardsSystemInfo = await fillDefaultItems(
				rewardsSystemInfo,
				Object.entries(DEFAULT_SYSTEM_ITEMS).filter((val) =>
					reward_types.includes(val[0]),
				) as [ItemType, Partial<IItem>][],
			);
		} catch (err) {
			throw new SystemError(err);
		}
	}

	local_reward_rate.filter((val) => {
		return (
			rewardsSystemInfo.find(
				(reward) => reward.type == val.type && reward.remainAmount != 0,
			) != undefined
		);
	});
	if (local_reward_rate.length == 0) {
		throw new SystemError('system have no reward');
	}

	let tried = 0;

	// third, start calc reward for user
	do {
		// get this turn lottery open result
		const rate = randInt(0, 100) / 100;
		const potentialRewards = local_reward_rate.filter(
			(value) => value.rate >= rate,
		);

		if (potentialRewards.length == 0) {
			tried++;
			continue;
		}
		const reward = potentialRewards[0];

		const rewardInfo = rewardsSystemInfo.find((val) => val.type == reward.type);
		// don't need to check remain amount here since we're already filter non empty result
		if (rewardInfo == undefined) {
			throw new SystemError('could not find reward');
		}

		if (rewardInfo.remainAmount > 0) {
			const updateResponse = await Item.updateOne(
				{ type: rewardInfo.type },
				{ $inc: { remainAmount: -1 } },
			);
			if (!updateResponse.acknowledged) {
				throw new SystemError("can't subtract reward amount from system");
			}
		}

		// update reward into user inventory
		await upsertInventoryItem(userObjectId, rewardInfo._id, 1);

		const decreaseResponse = await Inventory.updateOne(
			{ userId: userObjectId, 'items.itemId': userLottery.itemId },
			{ $inc: { 'items.$.amount': -1 } },
		);
		if (decreaseResponse.modifiedCount == 0) {
			throw new SystemError('could not decrase user lottery amount');
		}

		return {
			items: [{ itemId: rewardInfo.id, amount: 1 }],
			userId: user.id,
		};
	} while (tried < rewardsSystemInfo.length);

	throw new SystemError('Failed to retrieve reward');
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
	if (!decreaseResponse.acknowledged) {
		throw Error('failed to decreaseSystemLotteryAmount');
	}
	return;
};

const fillDefaultItems = async (
	rewardsSystemInfo: (Document<unknown, {}, IItem> &
		IItem & { _id: Types.ObjectId })[],
	defaultItems: [ItemType, Partial<IItem>][],
) => {
	const current_item_types = rewardsSystemInfo.map((item) => item.type);
	Object.values(defaultItems).forEach(async ([type, item]) => {
		if (!current_item_types.includes(type)) {
			const result = await Item.create({ ...item });
			if (result == undefined) {
				throw result.errors;
			}
			rewardsSystemInfo.push(result);
		}
	});
	return rewardsSystemInfo;
};

const upsertInventoryItem = async (
	userId: Types.ObjectId,
	itemId: Types.ObjectId,
	changes: number,
) => {
	const decreaseResponse = await Inventory.updateOne(
		{ userId: userId, 'items.itemId': itemId },
		{ $inc: { 'items.$.amount': changes } },
	);
	if (decreaseResponse.modifiedCount == 0) {
		const response = await Inventory.updateOne(
			{ userId: userId },
			{ $push: { items: { itemId: itemId, amount: 1 } } },
		);
		if (response.modifiedCount == 0) {
			throw new Error('failed to update inventory item');
		}
	}
};
