import type { CommandRunner, DuelState } from '../../../../types';
import { DuelPlace } from '../../../../types';
import { addToGround, cloneDuelSource, getPlayerOrder } from '../../../util';

export const summonMove: CommandRunner = ({ snapshot, command }) => {
	const { player, cardMap } = snapshot;
	const { owner, from, side } = command;
	const order = getPlayerOrder(player, owner);
	const groundClone = cloneDuelSource(snapshot, DuelPlace.Ground);
	const currentGround = groundClone.source[order];

	if ([DuelPlace.Ability, DuelPlace.Player].indexOf(from.place) >= 0) {
		const targetedCard = cardMap[`${from.id}0000`];
		const selectedCard = { ...targetedCard, base: targetedCard };

		addToGround(selectedCard, currentGround, side);

		return {
			ground: groundClone.source,
		} as DuelState;
	} else {
		const fromClone = cloneDuelSource(snapshot, from.place);
		const currentFrom = fromClone.source[order];
		const selectedCard = currentFrom[from.position];

		addToGround(selectedCard, currentGround, side);
		currentFrom.splice(from.position, 1);

		return {
			[fromClone.key]: fromClone.source as unknown,
			ground: groundClone.source,
		} as DuelState;
	}
};
