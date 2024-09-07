/* happen on end turn -> before new turn started */
import type {
	CommandCreator,
	DuelCommand,
	DuelIdentifier,
} from '../../../types';
import { DuelPlace } from '../../../types';
import cardMutateCommand from '../card/mutate';
import duelMutateCommand from '../duel/mutate';
import playerMutateCommand from '../player/mutate';

export const create: CommandCreator = ({ snapshot }): DuelCommand[] => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i: DuelCommand) => commands.push(i);
	const { setting, player, ground } = snapshot;
	const [firstPlayer, secondPlayer] = player;
	const [firstGround, secondGround] = ground;

	for (let i = 0; i < firstGround.length; i += 1) {
		const firstCard = firstGround[i];
		const secondCard = secondGround[i];

		if (firstCard && firstCard.cooldown > 1) {
			const identifier: DuelIdentifier = {
				id: firstCard.id,
				owner: firstPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			cardMutateCommand
				.create({
					snapshot,
					from: identifier,
					target: identifier,
					payload: {
						cooldown: -1,
					},
				})
				.forEach(registerCommand);
		}

		if (secondCard && secondCard.cooldown > 1) {
			const identifier: DuelIdentifier = {
				id: secondCard.id,
				owner: secondPlayer.id,
				place: DuelPlace.Ground,
				position: i,
			};

			cardMutateCommand
				.create({
					snapshot,
					from: identifier,
					target: identifier,
					payload: {
						cooldown: -1,
					},
				})
				.forEach(registerCommand);
		}
	}

	duelMutateCommand
		.create({ snapshot, payload: { turn: 1 } })
		.forEach(registerCommand);

	playerMutateCommand
		.create({
			snapshot,
			target: { owner: firstPlayer.id, place: DuelPlace.Player },
			payload: {
				perTurnHero: setting.perTurnHero - firstPlayer.perTurnHero,
				perTurnTroop: setting.perTurnTroop - firstPlayer.perTurnTroop,
			},
		})
		.forEach(registerCommand);

	playerMutateCommand
		.create({
			snapshot,
			target: { owner: secondPlayer.id, place: DuelPlace.Player },
			payload: {
				perTurnHero: setting.perTurnHero - secondPlayer.perTurnHero,
				perTurnTroop: setting.perTurnTroop - secondPlayer.perTurnTroop,
			},
		})
		.forEach(registerCommand);

	return commands;
};

export const endCommand = {
	create,
};

export default endCommand;
