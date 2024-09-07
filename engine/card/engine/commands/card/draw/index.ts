import type { CommandCreator, DuelCommand } from '../../../../types';
import { CommandType, DuelPlace } from '../../../../types';
import { getPlayerOrder } from '../../../util';

export const create: CommandCreator = ({ owner, snapshot }) => {
	const { player, deck } = snapshot;
	const order = getPlayerOrder(player, owner);
	const currentDeck = deck[order];
	const selectedPosition = Math.floor(Math.random() * currentDeck.length);
	const selectedCard = currentDeck[selectedPosition];

	const drawCommand = {
		owner,
		type: CommandType.CardMove,
		from: {
			id: selectedCard.id,
			position: selectedPosition,
			place: DuelPlace.Deck,
		},
		target: {
			place: DuelPlace.Hand,
		},
	} as DuelCommand;

	return [drawCommand];
};

export const drawCommand = {
	create,
};

export default drawCommand;
