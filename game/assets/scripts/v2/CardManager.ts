import { _decorator, Component, instantiate, Prefab, v3 } from 'cc';

import type { CM, ECS } from '../game';
import type { Entity } from '../game';
import { CardPlace, core, GCT, LCT, system } from '../game';
import { drawPlayerCard } from '../tween';

import { Card } from './Card';
const { ccclass, property } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {
	@property(Prefab)
	cardPrefab: Prefab;

	start() {
		if (!this.cardPrefab)
			throw Error('Need to assign cardPrefab to instantiate cards');

		const cards = core.query(LCT.CardAttribute).exec();
		cards.forEach((card) => {
			const cardNode = instantiate(this.cardPrefab);
			cardNode.setPosition(v3(0, 0, 0));
			cardNode.getComponent(Card).entityId = card.id;
			this.node.addChild(cardNode);
		});

		core
			.createEntity()
			.addComponent(GCT.CardManagerState, { initialized: false });
	}
}

core.addSystem({
	async update(ecs) {
		const entity = ecs.query(GCT.CardManagerState).exec().first();
		if (!entity) return;

		const cardManagerState = entity.getComponent(GCT.CardManagerState);
		if (cardManagerState.initialized) return;

		const playerCards = queryByCardPlace(core, system.playerId);
		for (let i = 0; i < playerCards.length; i++) {
			const card = playerCards[i];
			const { node } = card.getComponent(GCT.CardNode);

			await drawPlayerCard({
				node,
				index: i,
				total: playerCards.length,
			});
		}

		const enemyCards = queryByCardPlace(core, system.enemyId);
		for (const i in enemyCards) {
			const card = enemyCards[i];
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { node } = card.getComponent(GCT.CardNode);
			// await animateDrawEnemyCard({ node });
		}

		cardManagerState.initialized = true;
	},
});

export const sortByCardPlaceIndex = (card1: Entity<CM>, card2: Entity<CM>) => {
	const { index: i1 } = card1.getComponent(LCT.CardPlace);
	const { index: i2 } = card2.getComponent(LCT.CardPlace);

	return i1 > i2 ? 1 : 0;
};

export const queryByCardPlace = (core: ECS<CM>, owner: string) => {
	return core
		.query(LCT.CardPlace, { place: CardPlace.Hand })
		.and(LCT.CardOwnership, { owner: owner })
		.exec()
		.sort(sortByCardPlaceIndex);
};
