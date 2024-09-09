import type { CommandHandler } from '../util/type';

type InComingHandler = CommandHandler<{
	index: number;
	isMouseIn: boolean;
}>;

export const onInComingHover: InComingHandler = async (
	{ userId, send },
	{ index, isMouseIn },
) => {
	await send({ userId, index, isMouseIn });
};
