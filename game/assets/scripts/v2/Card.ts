import type { Vec3 } from 'cc';
import {
	_decorator,
	CCInteger,
	Component,
	Node,
	tween,
	UIOpacity,
	warn,
} from 'cc';

import type { GameECS } from '../game';
import { CardPlace, core, GCT, LCT, system } from '../game';
import { revealCard } from '../tween/v2/card';
import { calculateIndexPosition } from '../util/v2/calculate';
import { queryCards, queryPlaceOwnerById } from '../util/v2/queries';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
	@property(CCInteger)
	public entityId: number;

	@property({ type: Node, editorOnly: true })
	private cardNode: Node;

	@property({ type: Node, editorOnly: true })
	private glowNode: Node;

	@property({ type: Node, editorOnly: true })
	private frontNode: Node;

	@property({ type: Node, editorOnly: true })
	private backNode: Node;

	@property({ type: Node, visible: false })
	public handNode: Node;

	@property({ type: Node, visible: false })
	public deckNode: Node;

	@property({ type: Node, visible: false })
	public groundNode: Node;

	start() {}

	private async reveal() {
		const card = core.queryById(this.entityId);
		if (card.getComponent(LCT.CardPlace).place !== CardPlace.Ground) {
			warn('Card is not on ground for revealing', this.entityId);
			return;
		}

		await revealCard({ node: this.cardNode });
	}

	private glowOn() {
		this.glowNode.active = true;
		tween(this.glowNode.getComponent(UIOpacity))
			.set({ opacity: 0 })
			.to(3, { opacity: 150 }, { easing: 'expoOut' })
			.start();
	}

	private glowOff() {
		tween(this.glowNode.getComponent(UIOpacity))
			.to(1, { opacity: 0 }, { easing: 'expoOut' })
			.call(() => (this.glowNode.active = false))
			.start();
	}

	private cardInHandPosition(): Vec3 {
		const { place, index } = queryPlaceOwnerById(core, this.entityId);
		if (place !== CardPlace.Hand)
			warn("Card isn't in hand to get in-hand position", this.entityId);
		const total = queryCards(core, system.playerId, CardPlace.Hand).length;
		const centerPosition = this.handNode.position;

		return calculateIndexPosition({ index, total, centerPosition });
	}

	static updateCardUIComponents() {
		const update = (core: GameECS) => {
			Card.updateCardInHandPositions(core);
		};

		return { update };
	}

	static updateCardInHandPositions(core: GameECS) {
		const cardsInHand = core
			.query(LCT.CardPlace, { place: CardPlace.Hand })
			.exec();
		cardsInHand.forEach((card) => {
			const { index } = card.getComponent(LCT.CardPlace);
			const { node } = card.getComponent(GCT.CardNode);
			const centerPosition = node.getComponent(Card).cardInHandPosition();

			const position = calculateIndexPosition({
				index,
				total: cardsInHand.length,
				centerPosition,
			});

			card.addComponent(GCT.CardInHandPosition, { position });
		});
	}
}
