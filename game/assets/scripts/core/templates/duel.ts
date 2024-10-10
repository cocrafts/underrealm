import { CardPlace, CardType, ClassType, ComponentType } from '../components';
import { ECS } from '../ecs';

export const duelECS = new ECS();

duelECS
	.createEntity()
	.addComponent(ComponentType.Ownership, { owner: 'me' })
	.addComponent(ComponentType.Place, { place: CardPlace.Deck, index: 0 })
	.addComponent(ComponentType.Metadata, {
		name: 'Troop',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
	})
	.addComponent(ComponentType.Attribute, {
		attack: 20,
		defense: 0,
		health: 40,
	});
