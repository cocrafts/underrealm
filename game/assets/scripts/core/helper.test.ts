import {
	CardPlace,
	CardType,
	ClassType,
	ComponentType as CT,
} from './components';
import { ECS } from './ecs';
import { selectHand } from './helper';

describe('Test selectHand', () => {
	test('selectHand should correctly return the player hand', () => {
		const cardIndex = 4;
		const duelECS = new ECS();

		duelECS
			.createEntity()
			.addComponent(CT.CardMetadata, {
				id: '00013',
				name: 'Legionnaire',
				kind: CardType.Hero,
				class: ClassType.Knight,
				rarity: 0,
			})
			.addComponent(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Hand,
			})
			.addComponent(CT.Ownership, { owner: 'A' });

		duelECS
			.createEntity()
			.addComponent(CT.CardMetadata, {
				id: '00014',
				name: 'Head Hunter',
				kind: CardType.Hero,
				class: ClassType.Knight,
				rarity: 0,
			})
			.addComponent(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Hand,
			})
			.addComponent(CT.Ownership, { owner: 'B' });

		const hand = selectHand(duelECS, 'A');
		const output = hand.map((cardInHand) =>
			cardInHand.getComponent(CT.CardMetadata),
		);
		const expectedOutput = [
			{
				id: '00013',
				name: 'Legionnaire',
				kind: CardType.Hero,
				class: ClassType.Knight,
				rarity: 0,
				type: CT.CardMetadata,
			},
		];
		expect(output).toEqual(expectedOutput);
	});
});
