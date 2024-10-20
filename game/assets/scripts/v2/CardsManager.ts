import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';

import type { GameECS } from '../game';
import { CardPlace, core, GCT, LCT, system } from '../game';
import { querySortedCards } from '../util/v2/queries';

import { Card } from './Card';
const { ccclass, property } = _decorator;

@ccclass('CardsManager')
export class CardsManager extends Component {
	private static firstDistribution: boolean = true;

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
	}

	static distributeCardsSystem() {
		const update = async (core: GameECS) => {
			if (!CardsManager.firstDistribution) return;
			const { playerId, enemyId } = system;

			const playerCards = querySortedCards(core, playerId, CardPlace.Hand);
			for (let i = 0; i < playerCards.length; i++) {
				const card = playerCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToPlayerHand();
			}

			const enemyCards = querySortedCards(core, enemyId, CardPlace.Hand);
			for (let i = 0; i < enemyCards.length; i++) {
				const card = enemyCards[i];
				const { node } = card.getComponent(GCT.CardNode);
				await node.getComponent(Card).drawToEnemyHand();
			}

			CardsManager.firstDistribution = false;
		};

		return { update };
	}
}
