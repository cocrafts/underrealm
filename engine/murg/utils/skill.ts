import { getCard, getCardState } from './card';
import { pickUniqueIds } from './helper';
import type { CardState, CardType, DuelState } from './type';

export const pickGroundUnits = (list: string[], amount = 1) => {
	const filteredList = list.filter((i) => !!i);
	if (amount >= filteredList.length) return filteredList;

	return pickUniqueIds(filteredList, amount);
};

export const pickLowestHealth = (
	cardId: string,
	duel: DuelState,
	list: string[],
	cardTypes: CardType[],
): CardState => {
	return list
		.filter((i) => !!i)
		.map((id) => getCardState(duel.stateMap, id))
		.reduce((prev: CardState, current: CardState) => {
			const card = getCard(duel.cardMap, current.id);
			const isCardTypeValid = cardTypes.indexOf(card.kind) > -1;
			const isAllyValid = current.id !== cardId;
			const isLessHealthValid =
				current.health < prev.health || prev.health === undefined;
			if (isLessHealthValid && isCardTypeValid && isAllyValid) return current;
			return prev;
		}, {} as never);
};
