import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';

import { CardPlace, core, GCT, LCT, system } from '../game';
import { querySortedCards } from '../util/v2/queries';

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
		this.initCardNodes();
		this.distributeCards();
	}

	/**
	 * Only called once at starting
	 */
	private initCardNodes() {
		if (!this.cardPrefab)
			throw Error('Need to assign cardPrefab to instantiate cards');

		const cards = core.query(LCT.CardAttribute).exec();
		cards.forEach((card) => {
			const cardNode = instantiate(this.cardPrefab);
			cardNode.setPosition(v3(0, 0, 0));
			cardNode.getComponent(Card).entityId = card.id;
			cardNode.getComponent(Card).groundNode = this.groundNode;

			const { owner } = card.getComponent(LCT.Ownership);
			if (owner === system.playerId) {
				cardNode.getComponent(Card).handNode = this.playerHandNode;
				cardNode.getComponent(Card).deckNode = this.playerDeckNode;
			} else {
				cardNode.getComponent(Card).handNode = this.enemyHandNode;
				cardNode.getComponent(Card).deckNode = this.enemyDeckNode;
			}

			this.node.addChild(cardNode);

			card.addComponent(GCT.CardNode, { node: cardNode });
		});
	}

	/**
	 * Only called once at starting
	 */
	private async distributeCards() {
		const { playerId, enemyId } = system;

		const playerCards = querySortedCards(core, playerId, CardPlace.Hand);
		for (let i = 0; i < playerCards.length; i++) {
			const { node } = playerCards[i].getComponent(GCT.CardNode);
			await node.getComponent(Card).drawExpo();
		}

		const enemyCards = querySortedCards(core, enemyId, CardPlace.Hand);
		for (let i = 0; i < enemyCards.length; i++) {
			const { node } = enemyCards[i].getComponent(GCT.CardNode);
			await node.getComponent(Card).draw();
		}
	}
}
