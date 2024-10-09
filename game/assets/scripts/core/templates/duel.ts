import {
	CardPlace,
	CardType,
	ClassType,
	ComponentType,
	createComponent,
} from '../components';
import { ECS } from '../ecs';

export const duelECS = new ECS<ComponentType>();

duelECS
	.createEntity()
	.addComponent(createComponent(ComponentType.Ownership, { owner: 'me' }))
	.addComponent(
		createComponent(ComponentType.Place, { place: CardPlace.Deck, index: 0 }),
	)
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Troop',
			class: ClassType.Knight,
			kind: CardType.Hero,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 0,
			health: 40,
		}),
	);
