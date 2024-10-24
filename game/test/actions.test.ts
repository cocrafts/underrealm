import type { ComponentMap as CM } from '../assets/scripts/core/components';
import {
	CardPlace,
	CardType,
	ClassType,
	ComponentType as CT,
	DuelPhase,
} from '../assets/scripts/core/components';
import { ECS } from '../assets/scripts/core/ecs';
import { actions } from '../assets/scripts/core/systems/actions';

const mockCard: Omit<CM[CT.CardMetadata], 'type'>[] = [
	{
		id: '1',
		class: ClassType.Knight,
		kind: CardType.Hero,
		name: 'AAA',
		rarity: 0,
	},
	{
		id: '2',
		class: ClassType.Knight,
		kind: CardType.Hero,
		name: 'BBB',
		rarity: 0,
	},
	{
		id: '3',
		class: ClassType.Tanker,
		kind: CardType.Hero,
		name: 'CCC',
		rarity: 0,
	},
	{
		id: '4',
		class: ClassType.Beast,
		kind: CardType.Troop,
		name: 'DDD',
		rarity: 0,
	},
];

describe('Test cleanUp', () => {
	test('cleanUp should correctly increase charge and reinforce card', () => {
		const duelECS = new ECS();

		duelECS
			.createEntity()
			.addComponent(CT.DuelManager, { phase: DuelPhase.CleanUp, turnOf: 'A' });
		duelECS
			.createEntity()
			.addComponent(CT.PlayerAttribute, { id: 'A', health: 150 });
		duelECS
			.createEntity()
			.addComponent(CT.Ownership, { owner: 'A' })
			.addComponent(CT.CardMetadata, mockCard[2])
			.addComponent(CT.CardPlace, { index: 2, place: CardPlace.Ground });
		duelECS
			.createEntity()
			.addComponent(CT.Ownership, { owner: 'A' })
			.addComponent(CT.CardMetadata, mockCard[0])
			.addComponent(CT.CardPlace, { index: 0, place: CardPlace.Ground });
		duelECS
			.createEntity()
			.addComponent(CT.Ownership, { owner: 'A' })
			.addComponent(CT.CardMetadata, mockCard[1])
			.addComponent(CT.CardPlace, { index: 1, place: CardPlace.Ground });
		duelECS
			.createEntity()
			.addComponent(CT.Ownership, { owner: 'A' })
			.addComponent(CT.CardMetadata, mockCard[3])
			.addComponent(CT.CardPlace, { index: 8, place: CardPlace.Ground });
		duelECS.addSystem(actions.cleanUp());

		duelECS.update();

		const centerCard = duelECS
			.query(CT.CardPlace, { index: 5, place: CardPlace.Ground })
			.exec()
			.first()
			.getComponent(CT.CardMetadata);
		const leftCard = duelECS
			.query(CT.CardPlace, { index: 4, place: CardPlace.Ground })
			.exec()
			.first()
			.getComponent(CT.CardMetadata);
		const rightCard = duelECS
			.query(CT.CardPlace, { index: 6, place: CardPlace.Ground })
			.exec()
			.first()
			.getComponent(CT.CardMetadata);

		expect(centerCard).toEqual({ ...mockCard[2], type: CT.CardMetadata });
		expect(leftCard).toEqual({ ...mockCard[1], type: CT.CardMetadata });
		expect(rightCard).toEqual({ ...mockCard[3], type: CT.CardMetadata });
	});
});
