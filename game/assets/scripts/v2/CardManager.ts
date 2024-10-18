import { _decorator, Component, instantiate, Prefab, v3 } from 'cc';

import type { CM, ECS, GameECS } from '../game';
import type { Entity } from '../game';
import { CardPlace, core, GCT, LCT, system } from '../game';

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
			card.addComponent(GCT.CardNode, { node: cardNode });
			this.node.addChild(cardNode);
		});

		core
			.createEntity()
			.addComponent(GCT.CardManagerState, { initialized: false });
	}

	static distributeCardSystem() {
		const update = async (ecs: GameECS) => {
			const entity = ecs.query(GCT.CardManagerState).exec().first();
			if (!entity) return;

			const cardManagerState = entity.getComponent(GCT.CardManagerState);
			if (cardManagerState.initialized) return;

			const playerCards = CardManager.queryByCardPlace(core, system.playerId);
			for (let i = 0; i < playerCards.length; i++) {
				const card = playerCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToPlayerHand();
			}

			const enemyCards = CardManager.queryByCardPlace(core, system.enemyId);
			for (const i in enemyCards) {
				const card = enemyCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToEnemyHand();
			}

			cardManagerState.initialized = true;
		};

		return { update };
	}

	static queryByCardPlace = (core: ECS<CM>, owner: string) => {
		return core
			.query(LCT.CardPlace, { place: CardPlace.Hand })
			.and(LCT.Ownership, { owner: owner })
			.exec()
			.sort(CardManager.sortByCardPlaceIndex);
	};

	static sortByCardPlaceIndex = (card1: Entity<CM>, card2: Entity<CM>) => {
		const { index: i1 } = card1.getComponent(LCT.CardPlace);
		const { index: i2 } = card2.getComponent(LCT.CardPlace);

		return i1 > i2 ? 1 : 0;
	};
}
