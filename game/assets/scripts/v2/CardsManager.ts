import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';

import type { GameECS } from '../game';
import { core, GCT, LCT, system } from '../game';
import { querySortedCardsInHand } from '../util/v2/queries';

import { Card } from './Card';
const { ccclass, property } = _decorator;

@ccclass('CardsManager')
export class CardsManager extends Component {
	@property({ type: Prefab, editorOnly: true })
	private cardPrefab: Prefab;

	@property({ type: Node, editorOnly: true })
	private playerHandNode: Node;

	@property({ type: Node, editorOnly: true })
	private enemyHandNode: Node;

	@property({ type: Node, editorOnly: true })
	private playerDeckNode: Node;

	@property({ type: Node, editorOnly: true })
	private enemyDeckNode: Node;

	@property({ type: Node, editorOnly: true })
	private groundNode: Node;

	start() {
		if (!this.cardPrefab)
			throw Error('Need to assign cardPrefab to instantiate cards');

		const cards = core.query(LCT.CardAttribute).exec();
		cards.forEach((card) => {
			const cardNode = instantiate(this.cardPrefab);
			cardNode.setPosition(v3(0, 0, 0));
			cardNode.getComponent(Card).entityId = card.id;
			cardNode.getComponent(Card).handNode = this.playerHandNode;
			cardNode.getComponent(Card).deckNode = this.playerDeckNode;
			cardNode.getComponent(Card).groundNode = this.groundNode;
			this.node.addChild(cardNode);

			card.addComponent(GCT.CardNode, { node: cardNode });
		});

		core
			.createEntity()
			.addComponent(GCT.CardManagerState, { initialized: false });
	}

	static distributeCardsSystem() {
		const update = async (ecs: GameECS) => {
			const entity = ecs.query(GCT.CardManagerState).exec().first();
			if (!entity) return;

			const cardManagerState = entity.getComponent(GCT.CardManagerState);
			if (cardManagerState.initialized) return;

			const { playerId, enemyId } = system;

			const playerCards = querySortedCardsInHand(core, playerId);
			for (let i = 0; i < playerCards.length; i++) {
				const card = playerCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToPlayerHand();
			}

			const enemyCards = querySortedCardsInHand(core, enemyId);
			for (let i = 0; i < enemyCards.length; i++) {
				const card = enemyCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToEnemyHand();
			}

			cardManagerState.initialized = true;
		};

		return { update };
	}
}
