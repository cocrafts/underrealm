import type { CommandCreator, DuelCommand } from '../../../types';
import { DuelPlace } from '../../../types';
import { reinforceArray } from '../../util';
import moveCommand from '../card/move';

export const create: CommandCreator = ({ snapshot }) => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i: DuelCommand) => commands.push(i);
	const { player, ground } = snapshot;
	const [firstPlayer, secondPlayer] = player;
	const [firstGround, secondGround] = ground;
	const firstMirror = [...firstGround];
	const secondMirror = [...secondGround];
	const firstReinforce = reinforceArray(firstGround);
	const secondReinforce = reinforceArray(secondGround);

	for (let i = 0; i < firstReinforce.length; i += 1) {
		const firstCard = firstReinforce[i];
		const secondCard = secondReinforce[i];

		if (firstCard) {
			const lastPos = firstMirror.findIndex((o) => o?.id === firstCard.id);

			if (lastPos !== i) {
				firstMirror[lastPos] = firstCard;
				firstMirror[i] = null;

				moveCommand
					.create({
						snapshot,
						from: {
							id: firstCard.id,
							owner: firstPlayer.id,
							place: DuelPlace.Ground,
							position: lastPos,
						},
						target: {
							id: firstCard.id,
							owner: firstPlayer.id,
							place: DuelPlace.Ground,
							position: i,
						},
					})
					.forEach(registerCommand);
			}
		}

		if (secondCard) {
			const lastPos = secondMirror.findIndex((o) => o?.id === secondCard.id);

			if (lastPos !== i) {
				secondMirror[lastPos] = secondCard;
				secondMirror[i] = null;

				moveCommand
					.create({
						snapshot,
						from: {
							id: secondCard.id,
							owner: secondPlayer.id,
							place: DuelPlace.Ground,
							position: lastPos,
						},
						target: {
							id: secondCard.id,
							owner: secondPlayer.id,
							place: DuelPlace.Ground,
							position: i,
						},
					})
					.forEach(registerCommand);
			}
		}
	}

	return commands;
};

export const reinforceCommand = {
	create,
};

export default reinforceCommand;
