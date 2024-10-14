import jwt from 'jsonwebtoken';
import type { IMatchFinding } from 'models/game';
import { GameDuel, MatchFinding } from 'models/game';
import { Staking, StakingPackage, StakingStatus } from 'models/staking';
import { User } from 'models/user';
import type { FilterQuery } from 'mongoose';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';
import { pubsub, topicGenerator } from 'utils/pubsub';
import type { SubscriptionResolvers } from 'utils/types';

import { makeDuel } from '../duel';

const findMatch: SubscriptionResolvers['findMatch'] = {
	subscribe: async (_, { userId, staking }, { connectionId }) => {
		const topic = topicGenerator.findMatch({ userId });

		/*
		 * store subscription before publish
		 */
		const subscribed = await pubsub.subscribe(topic);

		const opponentQuery: FilterQuery<IMatchFinding> = {
			userId: { $ne: userId },
		};
		if (staking) {
			/*
			 * If staking is provided, check if user has enough points
			 */
			validateStaking(userId, staking);
		} else {
			opponentQuery.stakingPackage = { $exists: false };
		}

		const opponent = await MatchFinding.findOneAndDelete(opponentQuery, {
			sort: { created_at: 1 },
		});

		if (opponent) {
			console.log('Opponent found', opponent.userId);
			const { userId: opponentId, pubsubTopic: opponentTopic } = opponent;
			const { config, history } = makeDuel('00001', userId, opponentId);
			const duel = await GameDuel.create({ config, history });

			if (staking) {
				prepairStaking(duel.id, userId, opponentId, staking);
			}

			logger.info('created new game duel', duel.id);
			await Promise.all([
				publishFindMatch(topic, userId, duel.id),
				publishFindMatch(opponentTopic, opponentId, duel.id),
			]);
		} else {
			// If no opponent found, update the match finding record
			await MatchFinding.findOneAndUpdate(
				{ userId },
				{
					userId: userId,
					pubsubTopic: topic,
					connectionId,
					staking,
				},
				{ upsert: true, new: true },
			);
		}
		return subscribed;
	},
};

export const GameSubscriptionResolvers = {
	findMatch,
};

export const publishFindMatch = async (
	topic: string,
	userId: string,
	duelId: string,
) => {
	try {
		const secret = configs.GAME_JWT_PRIVATE_KEY;
		const token = jwt.sign({ userId, duelId }, secret, {
			expiresIn: '12h',
			algorithm: 'RS256',
		});

		await pubsub.publish(topic, { findMatch: { id: duelId, jwt: token } });
		logger.info(`published findMatch with match id: ${duelId}`, { userId });
	} catch (error) {
		logger.error('failed to sign jwt and publish match', error);
	}
};

export function getPointsForPackage(stakingPackage: StakingPackage): number {
	switch (stakingPackage) {
		case StakingPackage.U_10:
			return 10;
		case StakingPackage.U_50:
			return 50;
		case StakingPackage.U_100:
			return 100;
	}
}

async function validateStaking(userId: string, staking: StakingPackage) {
	const requiredPoints = getPointsForPackage(staking);
	const user = await User.findById(userId).select('points');
	if (!user || user.points < requiredPoints) {
		logger.info('User does not have enough points to stake', {
			userId,
			staking,
			requiredPoints,
			userPoints: user?.points,
		});
		throw new Error('User does not have enough points to stake');
	}
}

async function prepairStaking(
	duelId: string,
	userId: string,
	opponentId: string,
	stakingPackage: StakingPackage,
) {
	const pointsToDeduct = getPointsForPackage(stakingPackage);

	// Create a staking record in database
	const stakingRecord = Staking.create([
		{
			duelId,
			package: stakingPackage,
			player1: {
				userId,
				pointsStaked: pointsToDeduct,
			},
			player2: {
				userId: opponentId,
				pointsStaked: pointsToDeduct,
			},
			status: StakingStatus.PENDING,
		},
	]);

	// Only deduct points if staking record is created successfully
	if (stakingRecord) {
		const updateResults = await Promise.all([
			User.updateOne(
				{ _id: userId, points: { $gte: pointsToDeduct } },
				{ $inc: { points: -pointsToDeduct } },
				{ new: true },
			),
			User.updateOne(
				{ _id: opponentId, points: { $gte: pointsToDeduct } },
				{ $inc: { points: -pointsToDeduct } },
				{ new: true },
			),
		]);

		// Check if both users' points are updated successfully
		const updatedUsers = updateResults.filter(Boolean);
		if (updatedUsers.length !== 2) {
			throw new Error('Failed to update user points');
		}
	}
}
