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
