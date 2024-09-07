import type {
	CommandCreator,
	CommandRunner,
	DuelCommand,
} from '../../../../types';
import { CardType, CommandType, DuelPlace } from '../../../../types';
import {
	cloneDuelSource,
	createCommandResult,
	getPlayerOrder,
} from '../../../util';
import playerMutateCommand from '../../player/mutate';

import { destroyMove } from './destroy';
import { move } from './internal';
import { relocateMove } from './relocate';
import { summonMove } from './summon';

export const create: CommandCreator = ({
	snapshot,
	owner,
	from,
	target,
	side,
}) => {
	const { commands, registerCommand } = createCommandResult();
	const { player } = snapshot;
	const fromOrder = getPlayerOrder(player, from.owner);
	const currentPlayer = player[fromOrder];
	const fromClone = cloneDuelSource(snapshot, from.place);
	const currentFrom = fromClone.source[fromOrder];
	const fromCard = currentFrom[from.position];
	const fromPlayer = from.place === DuelPlace.Player;
	const fromHand = from.place === DuelPlace.Hand;
	const toGround = target.place === DuelPlace.Ground;
	const fromType = fromCard?.base?.type;
	const fromHeroCard = fromType === CardType.Hero;
	const fromTroopCard = from.id.startsWith('9999');
	const isHeroSummon = owner && fromHand && toGround && fromHeroCard;
	const isTroopSummon = owner && fromPlayer && toGround && fromTroopCard;
	const commandInstance: DuelCommand = {
		owner,
		type: CommandType.CardMove,
		from,
		target,
		side,
	};

	if (isHeroSummon) {
		if (currentPlayer.perTurnHero > 0) {
			registerCommand(commandInstance);
			playerMutateCommand
				.create({
					snapshot,
					target: { owner, place: DuelPlace.Player },
					payload: { perTurnHero: -1 },
				})
				.forEach(registerCommand);
		}
	} else if (isTroopSummon) {
		if (currentPlayer.perTurnTroop > 0) {
			registerCommand(commandInstance);
			playerMutateCommand
				.create({
					snapshot,
					target: { owner, place: DuelPlace.Player },
					payload: { perTurnTroop: -1 },
				})
				.forEach(registerCommand);
		}
	} else {
		registerCommand(commandInstance);
	}

	return commands;
};

export const run: CommandRunner = (runPayload) => {
	const { from, target } = runPayload.command;
	const fromGround = from.place === DuelPlace.Ground;
	const toGround = target.place === DuelPlace.Ground;
	const toGrave = target.place === DuelPlace.Grave;

	if (fromGround && toGround) {
		return relocateMove(runPayload);
	} else if (fromGround && toGrave) {
		return destroyMove(runPayload);
	} else if (toGround) {
		return summonMove(runPayload);
	}

	return move(runPayload);
};

export const moveCommand = {
	create,
	run,
};

export default moveCommand;
