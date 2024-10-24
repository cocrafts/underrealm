import type { ComponentMap } from './components';
import { CardPlace, ComponentType } from './components';
import type { ECS, Entity } from './ecs';

export const queryDeckCards = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Deck })
		.and(ComponentType.Ownership, { owner: playerId })
		.exec();
};

export const queryHandCards = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Hand })
		.and(ComponentType.Ownership, { owner: playerId })
		.exec();
};

export const queryGroundCards = (ecs: ECS<ComponentMap>, playerId: string) => {
	return ecs
		.query(ComponentType.CardPlace, { place: CardPlace.Ground })
		.and(ComponentType.Ownership, { owner: playerId })
		.exec();
};

export const cloneComponents = (
	entity: Entity<ComponentMap>,
	source: Entity<ComponentMap>,
) => {
	Object.keys(source).forEach((key: keyof ComponentMap) => {
		entity.addComponent(key, entity.getComponent(key));
	});
};

export const queryFacingCard = (
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
			c.getComponent(ComponentType.Ownership).owner !=
			card.getComponent(ComponentType.Ownership).owner,
	);

	return facingCard;
};
