import jwt from 'jsonwebtoken';
import { configs } from 'utils/config';
import { logger } from 'utils/logger';
import { pubsub, topicGenerator } from 'utils/pubsub';

import { onIncomingBundle } from './bundle';
import { onIncomingConnect } from './connect';
import { onIncomingHover } from './interaction';
import type {
	CommandContext,
	GameEvent,
	JwtPayload,
	ResponseSender,
} from './types';
import { EventType } from './types';

export const handleGameEvent = async ({
	jwt: token,
	type,
	payload,
}: GameEvent) => {
	try {
		const publicKey = configs.GAME_JWT_PUBLIC_KEY;
		const { userId, duelId } = jwt.verify(token, publicKey, {
			algorithms: ['RS256'],
		}) as JwtPayload;

		const send: ResponseSender = async (payload, targetType) => {
			const topic = topicGenerator.duel({ duelId });
			targetType = targetType || type;
			await pubsub.publish(topic, { type: targetType, userId, payload });
		};

		const context: CommandContext = { duelId, userId, command: type, send };

		if (type === EventType.ConnectMatch) {
			await onIncomingConnect(context, payload);
		} else if (type === EventType.SendBundle) {
			await onIncomingBundle(context, payload);
		} else if (type === EventType.CardHover) {
			await onIncomingHover(context, payload);
		}
	} catch (error) {
		logger.error(`Can not handle game event`, error);
	}
};
