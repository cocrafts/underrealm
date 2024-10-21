import type { EventMouse, Vec3 } from 'cc';
import {
	_decorator,
	CCInteger,
	Component,
	find,
	Node,
	tween,
	UIOpacity,
	warn,
} from 'cc';

import { CardPlace, core, LCT, system } from '../game';
import {
	defaultCardScale,
	detailedCardScale,
	drawCard,
	drawExpoCard,
	revealCard,
} from '../tween/v2/card';
import { setCursor } from '../util/helper';
import { queryCards, queryPlaceOwnerById } from '../util/v2/queries';
const { ccclass, property } = _decorator;

const { MOUSE_ENTER, MOUSE_LEAVE, MOUSE_UP, MOUSE_DOWN, MOUSE_MOVE } =
	Node.EventType;

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

	private allowDrag: boolean = false;
	private allowHover: boolean = false;
	private dragging: boolean = false;
	private mouseMoveCallback: Function = (e: EventMouse) => this.onMouseMove(e);
	private mouseUpCallback: Function = () => this.onMouseUp();

	start() {
		this.cardNode.on(MOUSE_ENTER, () => this.onMouseEnter());
		this.cardNode.on(MOUSE_LEAVE, () => this.onMouseLeave());
		this.cardNode.on(MOUSE_DOWN, () => this.onMouseDown());
		find('Canvas').on(MOUSE_MOVE, this.mouseMoveCallback);
		find('Canvas').on(MOUSE_UP, this.mouseUpCallback);
	}

	onDestroy() {
		this.cardNode.off(MOUSE_ENTER);
		this.cardNode.off(MOUSE_LEAVE);
		this.cardNode.off(MOUSE_DOWN);
		this.cardNode.off(MOUSE_UP);
		find('Canvas').off(MOUSE_MOVE, this.mouseMoveCallback);
		find('Canvas').off(MOUSE_DOWN, this.mouseUpCallback);
	}

	private onMouseEnter() {
		if (!this.allowHover || this.dragging) return;
		const { place, owner } = queryPlaceOwnerById(core, this.entityId);
		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('grab');
			this.showDetailInHand();
		}
	}

	private onMouseLeave() {
		if (!this.allowHover || this.dragging) return;
		const { place, owner } = queryPlaceOwnerById(core, this.entityId);
		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('auto');
			this.hideDetailInHand();
		}
	}

	private onMouseDown() {
		if (!this.allowDrag) return;
		this.dragging = true;
	}

	private onMouseUp() {
		if (!this.allowDrag || !this.dragging) return;
		const position = this.cardPositionInHand();
		const scale = defaultCardScale;
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.call(() => {
				this.dragging = false;
			})
			.start();
	}

	private onMouseMove(e: EventMouse) {
		if (!this.allowDrag || !this.dragging) return;
		const { x, y } = e.getDelta();
		this.cardNode.position = this.cardNode.position.add3f(x, y, 0);
	}

	private showDetailInHand() {
		const position = this.cardNode.position.clone();
		position.y = this.handNode.position.y + 168;
		const scale = detailedCardScale;
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	private hideDetailInHand() {
		const position = this.cardNode.position.clone();
		position.y = this.handNode.position.y;
		const scale = defaultCardScale;
		tween(this.cardNode)
			.to(0.8, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	/**
	 * This drawing is only used for player cards, it will enable hover/drag flags after drawing
	 */
	public async drawExpo() {
		await drawExpoCard({
			node: this.cardNode,
			from: this.deckNode.position,
			dest: this.cardPositionInHand(),
		});

		this.allowHover = true;
		this.allowDrag = true;
	}

	public async draw() {
		await drawCard({
			node: this.cardNode,
			from: this.deckNode.position,
			dest: this.cardPositionInHand(),
		});
	}

	public async reveal() {
		const card = core.queryById(this.entityId);
		if (card.getComponent(LCT.CardPlace).place !== CardPlace.Ground) {
			warn('Card is not on ground for revealing', this.entityId);
			return;
		}

		await revealCard({ node: this.cardNode });
	}

	public glowOn() {
		this.glowNode.active = true;
		tween(this.glowNode.getComponent(UIOpacity))
			.set({ opacity: 0 })
			.to(3, { opacity: 150 }, { easing: 'expoOut' })
			.start();
	}

	public glowOff() {
		tween(this.glowNode.getComponent(UIOpacity))
			.to(1, { opacity: 0 }, { easing: 'expoOut' })
			.call(() => (this.glowNode.active = false))
			.start();
	}

	private cardPositionInHand(): Vec3 {
		const { place, index } = queryPlaceOwnerById(core, this.entityId);
		if (place !== CardPlace.Hand)
			warn("Card isn't in hand to get in-hand position", this.entityId);

		const cardsInHand = queryCards(core, system.playerId, CardPlace.Hand);
		const centerIndex = Math.floor(cardsInHand.length / 2);
		const xPad = (index - centerIndex) * 80;
		const playerHandPosition = this.handNode.position.clone();
		const position = playerHandPosition.add3f(xPad, 0, index);

		return position;
	}
}
