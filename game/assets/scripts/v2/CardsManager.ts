import { _decorator, Component, instantiate, Node, Prefab, v3 } from 'cc';

import { CardPlace, core, GCT, LCT, system } from '../game';
import { queryCards, querySortedCards } from '../util/v2/queries';

import { Card } from './Card';
import { CardDetail } from './CardDetail';
import { CardDrawable } from './CardDrawable';
import { CardSummonable } from './CardSummonable';
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

	async start() {
		this.initCardNodes();
		Card.updateCardInHandPositions(core);
		await this.distributeCards();
		await this.assignPlayerCardComponents();
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
			card.addComponent(GCT.CardUIState, { dragging: false });
		});
	}

	/**
	 * Only called once at starting
	 */
	private async distributeCards() {
		const { playerId, enemyId } = system;
		await this.distributeCardsPerPlayer(playerId);
		await this.distributeCardsPerPlayer(enemyId);
	}

	private async distributeCardsPerPlayer(owner: string) {
		const isPlayer = owner === system.playerId;
		const cardsInDeck = queryCards(core, owner, CardPlace.Deck);
		const cardsInHand = querySortedCards(core, owner, CardPlace.Hand);
		const deckNode = isPlayer ? this.playerDeckNode : this.enemyDeckNode;
		const deckCounter = deckNode.getComponent(DeckCounter);

		// adding in-hand cards to player's deck for initial distribution
		let cardCount = cardsInDeck.length + cardsInHand.length;
		deckCounter.updateCount(cardCount);

		for (let i = 0; i < cardsInHand.length; i++) {
			const card = cardsInHand[i];
			const { node } = card.getComponent(GCT.CardNode);
			/**
			 * Temporarily add drawable for initial distribution, destroy after play drawing
			 */
			deckCounter.updateCount(--cardCount);
			const cardDrawable = node.addComponent(CardDrawable);
			cardDrawable.entityId = card.id;
			cardDrawable.cardNode = node;
			cardDrawable.deckNode = deckNode;
			if (isPlayer) await node.getComponent(CardDrawable).drawExpo();
			else await node.getComponent(CardDrawable).draw();
			cardDrawable.destroy();
		}
	}

	/**
	 * Only called once at starting
	 */
	private async assignPlayerCardComponents() {
		const playerCards = queryCards(core, system.playerId);
		for (let i = 0; i < playerCards.length; i++) {
			const card = playerCards[i];
			const { node } = card.getComponent(GCT.CardNode);
			const { place } = card.getComponent(LCT.CardPlace);
			if (place === CardPlace.Hand) {
				const cardDetail = node.addComponent(CardDetail);
				cardDetail.entityId = card.id;
				cardDetail.cardNode = node;
				cardDetail.initialize();
				const cardSummonable = node.addComponent(CardSummonable);
				cardSummonable.entityId = card.id;
				cardSummonable.cardNode = node;
				cardSummonable.initialize();
			}
		}
	}
}
