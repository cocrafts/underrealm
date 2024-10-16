import type { ComponentMap } from './components';
import { CardPlace, ComponentType } from './components';
import type { ECS, Entity } from './ecs';

export const selectDeck = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Deck })
		.and(ComponentType.CardOwnership, { owner: playerId })
		.exec();
};

export const selectHand = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Hand })
		.and(ComponentType.CardOwnership, { owner: playerId })
		.exec();
};

export const cloneEntity = (
	ecs: ECS<ComponentMap>,
	entity: Entity<ComponentMap>,
) => {
	const newCard = ecs.createEntity();
	Object.keys(entity).forEach((key: keyof ComponentMap) => {
		newCard.addComponent(key, entity.getComponent(key));
	});
	return newCard;
};

export const selectFacingCard = (
	ecs: ECS<ComponentMap>,
	card: Entity<ComponentMap>,
) => {
	if (card.getComponent(ComponentType.CardPlace).place !== CardPlace.Ground)
		return;

	const cards = ecs
		.query(ComponentType.CardPlace, {
			place: CardPlace.Ground,
			index: card.getComponent(ComponentType.CardPlace).index,
		})
		.exec();
	const [facingCard] = cards.filter(
		(c) =>
			c.getComponent(ComponentType.CardOwnership).owner !=
			card.getComponent(ComponentType.CardOwnership).owner,
	);

	return facingCard;
};
