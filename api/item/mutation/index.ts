import { Inventory } from 'models/inventory';
import type { IItem } from 'models/item';
import { consumeSystemItems, Item } from 'models/item';
import { PointLogType, PointsHistory } from 'models/points';
import { User } from 'models/user';
import { virtualId } from 'models/utils';
import type { Types } from 'mongoose';
import {
	ItemType,
	LOTTERY_DEFAULT_PRICE,
	LOTTERY_REWARD_CHANCE,
	LOTTERY_REWARD_RATE,
	randInt,
} from 'utils/common';
import { ClientError, SystemError } from 'utils/errors';
import { logger } from 'utils/logger';
import type { MutationResolvers } from 'utils/types';

export const purchaseLottery: MutationResolvers['purchaseLottery'] = async (
	error,
	_,
	{ user },
) => {
	const systemLotteryInfo = await Item.findOne({ type: ItemType.LOTTERY });
	if (systemLotteryInfo == undefined) {
		throw new SystemError('failed to get system lottery info');
	}

	let lotteryPrice: number;
	if (systemLotteryInfo.metadata.price == undefined) {
		logger.info('lottery price is missing, use default price');
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
	const pointHistory = await PointsHistory.create({
		userId: user.id,
		bindingId: user.id,
		source: PointLogType.BUY_ITEM,
		points: -lotteryPrice,
	});
	if (pointHistory == undefined) {
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
		logger.error('failed to decrase system lottery amount', err);
		throw new SystemError('failed to decrase system lottery amount');
	}

	// finnaly, update ticket number in inventory
	await addUserInventoryItem(
		virtualId(user).id,
		virtualId(systemLotteryInfo).id,
		1,
	);
	const result = {
		source: pointHistory.source,
		id: pointHistory.id,
		points: pointHistory.points,
		userId: user.id,
		bindingId: user.id,
	} as never;
	return result;
};

export const openLottery: MutationResolvers['openLottery'] = async (
	root,
	_,
	{ user },
) => {
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

	// check if user have lottery ticket
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

	try {
		// update amount of system item
		consumeSystemItems(rewardInfo, -1);
	} catch (err) {
		logger.info(`failed to subtract system item: ${err}`);
		throw new SystemError(err);
	}

	try {
		// update reward into user inventory
		await addUserInventoryItem(userObjectId, rewardInfo._id, 1);
	} catch (err) {
		logger.info(`failed to add item to user inventory: ${err}`);
		throw new SystemError(err);
	}
	try {
		// subtract lottery amount in user inventory
		await consumeUserInventoryItem(userObjectId, userLottery.itemId, 1);
	} catch (err) {
		logger.info(`failed to consume lottery ticket from user inventory: ${err}`);
		throw new SystemError(err);
	}

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
		{ _id: systemLotteryInfo.id, type: ItemType.LOTTERY },
		{ $inc: { remainAmount: -1 } },
	);

	// TODO: find way to update nested field of document
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
			throw new Error('failed to update inventory item');
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
		{ userId: userId, 'items.itemId': itemId },
		{ $inc: { 'items.$.amount': -amount } },
	);
	if (decreaseResponse.modifiedCount == 0) {
		throw new Error('failed to update inventory item');
	}
};
