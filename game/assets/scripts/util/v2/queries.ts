import type { CM, Entity, GameECS } from '../../game';
import { CardPlace, LCT } from '../../game';

export const queryCardsInHand = (core: GameECS, owner: string) => {
	return core
		.query(LCT.CardPlace, { place: CardPlace.Hand })
		.and(LCT.Ownership, { owner })
		.exec();
};

export const querySortedCardsInHand = (core: GameECS, owner: string) => {
	return queryCardsInHand(core, owner).sort(sortByCardPlaceIndex);
};

export const sortByCardPlaceIndex = (card1: Entity<CM>, card2: Entity<CM>) => {
	const { index: i1 } = card1.getComponent(LCT.CardPlace);
	const { index: i2 } = card2.getComponent(LCT.CardPlace);

	return i1 > i2 ? 1 : 0;
};
