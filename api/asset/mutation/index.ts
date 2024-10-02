import type { IItem } from 'models/asset';
import { consumeSystemItems, Inventory, Item } from 'models/asset';
import {
	GeneralPointTransaction,
	GeneralPointTransactionType,
} from 'models/generalPoints';
import { User } from 'models/user';
import type { Types } from 'mongoose';
import {
	ItemType,
	LOTTERY_REWARD_CHANCE,
	LOTTERY_REWARD_RATE,
	randInt,
} from 'utils/common';
import { ClientError, SystemError } from 'utils/errors';
import { logger } from 'utils/logger';
import { isObjectId, toHex } from 'utils/mongo';
import type { MutationResolvers } from 'utils/types';

export const purchaseLottery: MutationResolvers['purchaseLottery'] = async (
	error,
	_,
	{ user },
) => {
	const lottery = await Item.findOne({ type: ItemType.LOTTERY });
	if (!lottery) {
		throw new SystemError('failed to get system lottery info');
	}

	let lotteryPrice: number;
	if (!lottery.metadata.price) {
		throw new SystemError('lottery price is missing');
	} else {
		lotteryPrice = Number(lottery.metadata.price);
	}

	if (user.points == undefined) {
		throw new SystemError('could not retrieve point of user');
	}

	if (user.points < lotteryPrice) {
		throw new ClientError('user have no enough point');
	}

	if (lottery.remainAmount == 0) {
		throw new SystemError('system have no enough lottery');
	}

	// first, insert the transaction
	const pointHistory = await GeneralPointTransaction.create({
		userId: user.id,
		type: GeneralPointTransactionType.PURCHASE_LOTTERY,
		points: -lotteryPrice,
	});
	if (!pointHistory) {
		throw new SystemError('failed to update user point transaction');
	}

	// second, update the point of user
	const updateResponse = await User.updateOne(
		{ _id: user.id, points: { $gte: lotteryPrice } },
		{ $inc: { points: -lotteryPrice } },
	);

	if (!updateResponse.acknowledged) {
		throw new SystemError('failed to update user point');
	}

	// third, update the remain ticket of the system
	await decreaseSystemLotteryAmount(lottery);

	// finnaly, update ticket number in inventory
	await addUserInventoryItem(toHex(user.id), lottery._id, 1);
	return {
		type: pointHistory.type,
		id: pointHistory.id,
		points: pointHistory.points,
		userId: user.id,
	};
};

export const openLottery: MutationResolvers['openLottery'] = async (
	root,
	_,
	{ user },
) => {
	const userObjectId = toHex(user.id);
	// first, check if user's inventory include lottery ticket
	let userInventory = await Inventory.findOne({ userId: user.id }).populate(
		'items.itemId',
	);

	if (!userInventory) {
		userInventory = await Inventory.create({
			userId: userObjectId,
			items: [],
		});
		throw new ClientError('user has no ticket');
	}

	// check if user have lottery ticket
	const userLottery = userInventory.items
		.filter(
			(val) => !isObjectId(val.itemId) && val.itemId.type == ItemType.LOTTERY,
		)
		.at(0);

	if (isObjectId(userLottery.itemId)) {
		throw new SystemError('received invalid populated result');
	}

	if (!userLottery || userLottery.amount == 0) {
		throw new ClientError('user has no lottery ticket');
	}

	// second, check system available reward
	const reward_types = Object.keys(LOTTERY_REWARD_CHANCE);
	const local_reward_rate = LOTTERY_REWARD_RATE;
	const rewardsSystemInfo = await Item.find({
		type: { $in: reward_types },
	});

	if (rewardsSystemInfo.length != reward_types.length) {
		logger.info('failed to retrieve reward');
		throw new SystemError('failed to retrieve reward');
	}
	const filtered_reward_rates = local_reward_rate.filter((val) => {
		return (
			rewardsSystemInfo.findIndex(
				(reward) => reward.type == val.type && reward.remainAmount != 0,
			) != -1
		);
	});
	if (filtered_reward_rates.length == 0) {
		logger.info('system have no available rewards');
		throw new SystemError('system have no available rewards');
	}

	// calc reward for user
	const retried = 10;
	const reward = calcUserReward(filtered_reward_rates, retried);
	if (reward == undefined) {
		logger.info(`failed to retrieve reward for user after ${retried} retries`);
		throw new SystemError('failed to retrieve reward user');
	}

	const rewardInfo = rewardsSystemInfo.find((val) => val.type == reward.type);

	// update amount of system item
	await consumeSystemItems(rewardInfo, -1);

	// update reward into user inventory
	await addUserInventoryItem(userObjectId, rewardInfo._id, 1);

	// subtract lottery amount in user inventory
	await consumeUserInventoryItem(userObjectId, toHex(userLottery.itemId.id), 1);

	return {
		userId: user.id,
		items: [
			{
				itemId: rewardInfo.id,
				amount: 1,
				type: rewardInfo.type,
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
		{
			_id: systemLotteryInfo.id,
			type: ItemType.LOTTERY,
			remainAmount: { $gte: 1 },
		},
		{ $inc: { remainAmount: -1 } },
	);

	if (!decreaseResponse.acknowledged) {
		throw Error('failed to decreaseSystemLotteryAmount');
	}
	return;
};

const calcUserReward = (
	potentialRewardsRates: {
		type: ItemType;
		rate: number;
	}[],
	retries: number = 10,
) => {
	let retried = 0;
	do {
		const rate = randInt(0, 100) / 100;
		const potentialRewards = potentialRewardsRates.filter(
			(value) => value.rate >= rate,
		);

		if (potentialRewards.length == 0) {
			retried++;
			continue;
		}
		return potentialRewards[0];
	} while (retried < retries);
	return undefined;
};

const addUserInventoryItem = async (
	userId: Types.ObjectId,
	itemId: Types.ObjectId,
	amount: number,
) => {
	if (amount <= 0) {
		throw new Error('amount must be greater than zero');
	}
	const updateResponse = await Inventory.updateOne(
		{ userId: userId, 'items.itemId': itemId },
		{ $inc: { 'items.$.amount': amount } },
	);
	if (updateResponse.modifiedCount == 0) {
		const response = await Inventory.updateOne(
			{ userId: userId },
			{ $push: { items: { itemId: itemId, amount: amount } } },
			{ upsert: true },
		);
		if (response.modifiedCount == 0 && response.upsertedCount == 0) {
			throw new SystemError('failed to update inventory item');
		}
	}
};

const consumeUserInventoryItem = async (
	userId: Types.ObjectId,
	itemId: Types.ObjectId,
	amount: number,
) => {
	if (amount <= 0) {
		throw new Error('amount must be greater than zero');
	}
	const decreaseResponse = await Inventory.updateOne(
		{
			userId: userId,
			'items.itemId': itemId,
			'items.amount': { $gte: amount },
		},
		{ $inc: { 'items.$.amount': -amount } },
	);
	if (decreaseResponse.modifiedCount == 0) {
		throw new SystemError('failed to update inventory item');
	}
};
