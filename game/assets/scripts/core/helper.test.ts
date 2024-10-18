import type { ComponentMap as CM } from './components';
import {
	CardPlace,
	CardType,
	ClassType,
	ComponentType as CT,
} from './components';
import { ECS } from './ecs';
import { handleCardFight, handleCardFightPlayer } from './helper';

describe('Test handleCardFight', () => {
	test('handleCardFight should correctly calculate the remaining heath of card2/defenseCard', () => {
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
			.addComponent(CT.CardFightAttribute, {
				attack: 25,
				defense: 5,
				health: 50,
			})
			.addComponent(CT.CardBuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardDebuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Ground,
			})
			.addComponent(CT.CardOwnership, { owner: 'A' });

		duelECS
			.createEntity()
			.addComponent(CT.CardMetadata, {
				id: '00014',
				name: 'Head Hunter',
				kind: CardType.Hero,
				class: ClassType.Knight,
				rarity: 0,
			})
			.addComponent(CT.CardFightAttribute, {
				attack: 20,
				defense: 0,
				health: 50,
			})
			.addComponent(CT.CardBuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardDebuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Ground,
			})
			.addComponent(CT.CardOwnership, { owner: 'B' });

		const [card1, card2] = duelECS
			.query(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Ground,
			})
			.exec();

		handleCardFight([card1, card2]);
		const [defenseCard] = duelECS
			.query(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Ground,
			})
			.and(CT.CardOwnership, {
				owner: 'B',
			})
			.exec();
		const output = defenseCard.getComponent(CT.CardFightAttribute);
		const expectedOutput = {
			type: CT.CardFightAttribute,
			attack: 20,
			defense: 0,
			health: 25,
		};
		expect(output).toEqual(expectedOutput);
	});
});

describe('Test handleCardFightPlayer', () => {
	test('handleCardFightPlayer should correctly reduce player health', () => {
		const cardIndex = 4;
		const duelECS = new ECS();

		duelECS
			.createEntity()
			.addComponent(CT.PlayerAttribute, { id: 'A', health: 150 });

		duelECS
			.createEntity()
			.addComponent(CT.PlayerAttribute, { id: 'B', health: 150 });

		duelECS
			.createEntity()
			.addComponent(CT.CardMetadata, {
				id: '00013',
				name: 'Legionnaire',
				kind: CardType.Hero,
				class: ClassType.Knight,
				rarity: 0,
			})
			.addComponent(CT.CardFightAttribute, {
				attack: 25,
				defense: 5,
				health: 50,
			})
			.addComponent(CT.CardBuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardDebuffAttribute, {
				attack: 0,
				defense: 0,
				health: 0,
			})
			.addComponent(CT.CardPlace, {
				index: cardIndex,
				place: CardPlace.Ground,
			})
			.addComponent(CT.CardOwnership, { owner: 'A' });

		const [card] = duelECS
			.query(CT.CardPlace, {
				place: CardPlace.Ground,
				index: cardIndex,
			})
			.exec();

		handleCardFightPlayer(duelECS, card);
		const [player] = duelECS.query(CT.PlayerAttribute, { id: 'B' }).exec();
		const output = player.getComponent(CT.PlayerAttribute);
		const expectedOutput: CM[CT.PlayerAttribute] = {
			id: 'B',
			health: 150 - 25,
			type: CT.PlayerAttribute,
		};

		expect(output).toEqual(expectedOutput);
	});
});
