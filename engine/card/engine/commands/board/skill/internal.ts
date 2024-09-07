import type {
	CreateCommandPayload,
	DuelCommand,
	DuelIdentifier,
} from '../../../../types';
import { run as runAbility } from '../../../abilities';
import { getPlayerOrder } from '../../../util';

export const activate = (
	{ snapshot }: CreateCommandPayload,
	from: DuelIdentifier,
): DuelCommand[] => {
	const { player, ground } = snapshot;
	const order = getPlayerOrder(player, from.owner);
	const currentGround = ground[order];
	const currentUnit = currentGround[from.position];
	if (currentUnit?.id !== from.id) return [];

	return runAbility({
		ability: currentUnit.base.ability,
		snapshot,
		from,
	});
};
