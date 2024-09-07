import type {
	CreateCommandPayload,
	DuelCommand,
	DuelIdentifier,
} from '../../../../types';
import { DuelPlace } from '../../../../types';
import { createCommandResult, getPlayerOrder } from '../../../util';
import cardMoveCommand from '../../card/move';
import cardMutateCommand from '../../card/mutate';
import playerMutateCommand from '../../player/mutate';

export const combat = (
	{ snapshot }: CreateCommandPayload,
	position: number,
): DuelCommand[] => {
	const commands: DuelCommand[] = [];
	const registerCommand = (i: DuelCommand) => commands.push(i);
	const { ground, player } = snapshot;
	const [firstPlayer, secondPlayer] = player;
	const firstCard = ground[0][position];
	const secondCard = ground[1][position];
	const firstHealth = firstCard.health - secondCard.attack;
	const secondHealth = secondCard.health - firstCard.attack;
	const firstCI: DuelIdentifier = {
		id: firstCard.id,
		owner: firstPlayer.id,
		position,
		place: DuelPlace.Ground,
	};
	const secondCI: DuelIdentifier = {
		id: secondCard.id,
		owner: secondPlayer.id,
		position,
		place: DuelPlace.Ground,
	};

	cardMutateCommand
		.create({
			owner: firstPlayer.id,
			snapshot,
			from: secondCI,
			target: firstCI,
			payload: { health: -secondCard.attack },
		})
		.forEach(registerCommand);

	if (firstHealth <= 0) {
		cardMoveCommand
			.create({
				owner: firstPlayer.id,
				snapshot,
				from: firstCI,
				target: { place: DuelPlace.Grave },
			})
			.forEach(registerCommand);
	}

	cardMutateCommand
		.create({
			owner: secondPlayer.id,
			snapshot,
			from: firstCI,
			target: secondCI,
			payload: { health: -firstCard.attack },
		})
		.forEach(registerCommand);

	if (secondHealth <= 0) {
		cardMoveCommand
			.create({
				owner: secondPlayer.id,
				snapshot,
				from: secondCI,
				target: { place: DuelPlace.Grave },
			})
			.forEach(registerCommand);
	}

	return commands;
};

export const attack = (
	{ snapshot }: CreateCommandPayload,
	from: DuelIdentifier,
): DuelCommand[] => {
	const { commands, registerCommand } = createCommandResult();
	const { player, ground } = snapshot;
	const order = getPlayerOrder(player, from.owner);
	const opponentOrder = order === 0 ? 1 : 0;
	const opponent = player[opponentOrder];
	const currentGround = ground[order];
	const currentUnit = currentGround[from.position];
	if (currentUnit?.id !== from.id) return [];

	playerMutateCommand
		.create({
			snapshot,
			from,
			target: {
				owner: opponent.id,
				place: DuelPlace.Player,
			},
			payload: { health: -currentUnit.attack },
		})
		.forEach(registerCommand);

	return commands;
};
