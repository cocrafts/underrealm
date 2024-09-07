import type { CommandRunner, DuelState } from '../../../../types';
import { DuelPlace } from '../../../../types';
import { cloneDuelSource, getPlayerOrder } from '../../../util';

export const destroyMove: CommandRunner = ({ snapshot, command }) => {
	const { player } = snapshot;
	const { owner, from } = command;
	const order = getPlayerOrder(player, owner);
	const groundClone = cloneDuelSource(snapshot, DuelPlace.Ground);
	const currentGround = groundClone.source[order];
	const currentInstance = currentGround[from.position];
	if (currentInstance?.id !== from.id) return {} as DuelState;

	const graveClone = cloneDuelSource(snapshot, DuelPlace.Grave);
	const currentGrave = graveClone.source[order];

	currentGround[from.position] = null;
	currentGrave.push(currentInstance);

	return {
		ground: groundClone.source,
	} as DuelState;
};
