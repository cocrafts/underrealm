import type { CommandRunner, DuelState } from '../../../../types';
import { DuelPlace } from '../../../../types';
import { addToGround, cloneDuelSource, getPlayerOrder } from '../../../util';

export const move: CommandRunner = ({ command, snapshot }) => {
	const { player, cardMap } = snapshot;
	const { owner, from, target, side } = command;
	const order = getPlayerOrder(player, owner);
	const targetClone = cloneDuelSource(snapshot, target.place);
	const currentTarget = targetClone.source[order];

	if ([DuelPlace.Player, DuelPlace.Ability].indexOf(from.place) >= 0) {
		const targetedCard = cardMap[`${from.id}0000`];
		const selectedCard = { ...targetedCard, base: targetedCard };

		addToGround(selectedCard, currentTarget, side);

		return { [targetClone.key]: targetClone.source as unknown } as DuelState;
	} else {
		const fromClone = cloneDuelSource(snapshot, from.place);
		const currentFrom = fromClone.source[order];
		const selectedCard = currentFrom[from.position];

		currentTarget.push(selectedCard);
		currentFrom.splice(from.position, 1);

		return {
			[fromClone.key]: fromClone.source as unknown,
			[targetClone.key]: targetClone.source as unknown,
		} as DuelState;
	}
};
