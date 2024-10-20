import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';

import { CardPlace, core, GCT, LCT, system } from '../game';
import { queryCards, querySortedCards } from '../util/v2/queries';

import { Card } from './Card';
import { DeckCounter } from './DeckCounter';
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

		// adding in-hand cards to player's deck for initial distribution
		const playerCardsInDeck = queryCards(core, playerId, CardPlace.Deck);
		const playerCardsInHand = querySortedCards(core, playerId, CardPlace.Hand);
		const playerDeckCounter = this.playerDeckNode.getComponent(DeckCounter);
		let playerCardCount = playerCardsInDeck.length + playerCardsInHand.length;
		playerDeckCounter.updateCount(playerCardCount);

		// adding in-hand cards to enemy's deck for initial distribution
		const enemyCardsInDeck = queryCards(core, enemyId, CardPlace.Deck);
		const enemyCardsInHand = querySortedCards(core, enemyId, CardPlace.Hand);
		const enemyDeckCounter = this.enemyDeckNode.getComponent(DeckCounter);
		let enemyCardCount = enemyCardsInDeck.length + enemyCardsInHand.length;
		enemyDeckCounter.updateCount(enemyCardCount);

		for (let i = 0; i < playerCardsInHand.length; i++) {
			const { node } = playerCardsInHand[i].getComponent(GCT.CardNode);
			await node.getComponent(Card).drawExpo();
			playerDeckCounter.updateCount(--playerCardCount);
		}

		for (let i = 0; i < enemyCardsInHand.length; i++) {
			const { node } = enemyCardsInHand[i].getComponent(GCT.CardNode);
			await node.getComponent(Card).draw();
			enemyDeckCounter.updateCount(--enemyCardCount);
		}
	}
}
