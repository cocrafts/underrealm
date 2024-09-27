import { pubsub, topicGenerator } from 'utils/pubsub';

import type { CommandHandler } from './types';

type IncomingHandler = CommandHandler<{
	index: number;
	isMouseIn: boolean;
}>;

export const onIncomingHover: IncomingHandler = async (
	{ userId, matchId, command },
	{ index, isMouseIn },
): Promise<void> => {
	const topic = topicGenerator.match({ matchId });
	await pubsub.publish(topic, { userId, command, index, isMouseIn });
};
