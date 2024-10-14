import { CardPlace, CardType, ClassType, ComponentType } from '../components';
import { ECS } from '../ecs';

export const duelECS = new ECS();

duelECS
	.createEntity()
	.addComponent(ComponentType.CardOwnership, { owner: 'me' })
	.addComponent(ComponentType.PlayerAttribute, { health: 149 });

duelECS
	.createEntity()
	.addComponent(ComponentType.CardOwnership, { owner: 'enemy' })
	.addComponent(ComponentType.PlayerAttribute, { health: 149 });

duelECS
	.createEntity()
	.addComponent(ComponentType.CardOwnership, { owner: 'me' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Deck, index: 0 })
	.addComponent(ComponentType.CardMetadata, {
		name: 'Troop',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 40,
	});

duelECS
	.createEntity()
	.addComponent(ComponentType.CardOwnership, { owner: 'me' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Hand, index: 0 })
	.addComponent(ComponentType.CardMetadata, {
		name: 'Troop',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 40,
	});

duelECS
	.createEntity()
	.addComponent(ComponentType.CardOwnership, { owner: 'me' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Hand, index: 1 })
	.addComponent(ComponentType.CardMetadata, {
		name: 'Troop',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 40,
	});
