import type { CardPlace, CM, Entity, GameECS } from '../../game';
import { LCT } from '../../game';

export const queryPlaceOwnerById = (core: GameECS, id: number) => {
	const entity = core.queryById(id);
	return {
		...entity.getComponent(LCT.CardPlace),
		...entity.getComponent(LCT.Ownership),
	};
};

export const queryPlayerAttribute = (core: GameECS, owner: string) => {
	const playerAttribute = core
		.query(LCT.Ownership, { owner })
		.and(LCT.PlayerAttribute)
		.exec()
		.first()
		.getComponent(LCT.PlayerAttribute);

	return playerAttribute;
};

export const queryCards = (core: GameECS, owner: string, place: CardPlace) => {
	return core
		.query(LCT.CardPlace, { place })
		.and(LCT.Ownership, { owner })
		.exec();
};

export const querySortedCards = (
	core: GameECS,
	owner: string,
	place: CardPlace,
) => {
	return queryCards(core, owner, place).sort(sortByCardPlaceIndex);
};

export const sortByCardPlaceIndex = (card1: Entity<CM>, card2: Entity<CM>) => {
	const { index: i1 } = card1.getComponent(LCT.CardPlace);
	const { index: i2 } = card2.getComponent(LCT.CardPlace);

	return i1 > i2 ? 1 : 0;
};
