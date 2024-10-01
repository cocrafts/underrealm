import type { CommandHandler } from './types';

type IncomingHandler = CommandHandler<{
	index: number;
	isMouseIn: boolean;
}>;

export const onIncomingHover: IncomingHandler = async (
	{ send },
	{ index, isMouseIn },
): Promise<void> => {
	await send({ index, isMouseIn });
};
