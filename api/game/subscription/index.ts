import jwt from 'jsonwebtoken';
import type { IMatchFinding } from 'models/game';
import { GameDuel, MatchFinding, StakingPackage } from 'models/game';
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

		/**
		 * store subscription before publish
		 */
		const subscribed = await pubsub.subscribe(topic);

		const opponentQuery: FilterQuery<IMatchFinding> = {
			userId: { $ne: userId },
		};

		if (staking) {
			const requiredPoints = getPointsForPackage(staking);
			const user = await User.findById(userId).select('points');
			if (!user || user.points < requiredPoints) {
				logger.info('User does not have enough points to stake', {
					userId,
					staking,
					requiredPoints,
					userPoints: user?.points,
				});
				return subscribed;
			}
		}

		const opponent = await MatchFinding.findOneAndDelete(opponentQuery, {
			sort: { created_at: 1 },
		});

		if (opponent) {
			const { userId: opponentId, pubsubTopic: opponentTopic } = opponent;
			const { config, history } = makeDuel('00001', userId, opponentId);
			const duel = await GameDuel.create({
				config,
				history,
				stakingPackage: staking,
			});

			if (staking) {
				const pointsToDeduct = getPointsForPackage(staking);
				await Promise.all([
					User.updateOne(
						{ _id: userId },
						{ $inc: { points: -pointsToDeduct } },
					),
					User.updateOne(
						{ _id: opponentId },
						{ $inc: { points: -pointsToDeduct } },
					),
				]);
			}

			logger.info('created new game duel', duel.id);

			await Promise.all([
				publishFindMatch(topic, userId, duel.id),
				publishFindMatch(opponentTopic, opponentId, duel.id),
			]);
		} else {
			await MatchFinding.create({
				userId: userId,
				pubsubTopic: topic,
				connectionId,
				staking,
			});
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
