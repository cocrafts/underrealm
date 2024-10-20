import type { EventMouse } from 'cc';
import {
	_decorator,
	CCInteger,
	Component,
	find,
	Node,
	Quat,
	tween,
	UIOpacity,
	Vec3,
	warn,
} from 'cc';

import { CardPlace, core, LCT, system } from '../game';
import { animateExpoCard } from '../tween';
import { setCursor } from '../util/helper';
import { playEffectSound } from '../util/resources';
import { queryCards } from '../util/v2/queries';
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

		const card = core.queryById(this.entityId);
		const { place } = card.getComponent(LCT.CardPlace);
		const { owner } = card.getComponent(LCT.Ownership);

		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('grab');
			this.showDetailOnHand();
		}
	}

	private onMouseLeave() {
		if (!this.allowHover || this.dragging) return;

		const card = core.queryById(this.entityId);
		const { place } = card.getComponent(LCT.CardPlace);
		const { owner } = card.getComponent(LCT.Ownership);

		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('auto');
			this.hideDetailOnHand();
		}
	}

	private onMouseDown() {
		if (!this.allowDrag) return;
		this.dragging = true;
	}

	private onMouseUp() {
		if (!this.allowDrag || !this.dragging) return;
		this.dragging = false;
		const position = this.cardPositionInHand();
		const scale = new Vec3(0.4, 0.4, 1);
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	private onMouseMove(e: EventMouse) {
		if (!this.allowDrag || !this.dragging) return;
		const { x, y } = e.getDelta();
		this.cardNode.position = this.cardNode.position.add3f(x, y, 0);
	}

	private showDetailOnHand() {
		const position = this.cardNode.position.clone();
		position.y = this.handNode.position.y + 168;
		const scale = new Vec3(0.6, 0.6, 1);
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	private hideDetailOnHand() {
		const position = this.cardNode.position.clone();
		position.y = this.handNode.position.y;
		const scale = new Vec3(0.4, 0.4, 1);
		tween(this.cardNode)
			.to(0.8, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	/**
	 * This drawing is only used for player cards, it will enable hover/drag flags after drawing
	 */
	public drawExpo() {
		const { owner } = core.queryById(this.entityId).getComponent(LCT.Ownership);
		if (owner !== system.playerId) {
			throw Error("Can not draw expo for non-player's cards");
		}

		const dest = this.cardPositionInHand();
		return new Promise<void>((resolve) => {
			animateExpoCard({
				node: this.cardNode,
				from: this.deckNode.position,
				dest: this.deckNode.position.clone().add3f(0, 240, 0),
				delay: 0,
				speed: 1,
			})
				.to(
					0.8,
					{ position: dest, scale: new Vec3(0.4, 0.4, 1) },
					{ easing: 'expoOut' },
				)
				.call(() => {
					playEffectSound('light-fire', 0.3);
					this.allowHover = true;
					this.allowDrag = true;
					resolve();
				})
				.start();
		});
	}

	public draw(): Promise<void> {
		const dest = this.cardPositionInHand();
		return new Promise<void>((resolve) => {
			const r1 = Quat.fromEuler(new Quat(), 0, 0, 90);
			const r2 = Quat.fromEuler(new Quat(), 0, 0, 180);
			tween(this.cardNode)
				.call(() => playEffectSound('card-flip', 0.3))
				.set({
					position: this.deckNode.position,
					rotation: r1,
					scale: new Vec3(0.18, 0.18, 1),
				})
				.to(
					1,
					{ position: dest, rotation: r2, scale: new Vec3(0.28, 0.28, 1) },
					{ easing: 'expoInOut' },
				)
				.call(() => resolve())
				.start();
		});
	}

	public reveal(): Promise<void> {
		const card = core.queryById(this.entityId);
		if (card.getComponent(LCT.CardPlace).place !== CardPlace.Ground) {
			warn('Card is not on ground for revealing', this.entityId);
			return;
		}

		return new Promise((resolve) => {
			let flipped = false;
			const distance = 50;

			const translate = tween(this.cardNode)
				.by(0.25, { position: new Vec3(0, distance, 0) }, { easing: 'backOut' })
				.by(
					0.75,
					{ position: new Vec3(0, -distance, 0) },
					{ easing: 'expoOut' },
				);

			const scale = tween(this.cardNode)
				.to(0.25, { scale: new Vec3(0.25, 0.25, 1) })
				.to(0.75, { scale: new Vec3(0.24, 0.24, 1) }, { easing: 'backOut' });

			const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
			const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);
			const rotate = tween(this.cardNode)
				.set({ rotation: r1 })
				.to(
					1,
					{ rotation: r2 },
					{
						easing: 'expoOut',
						onUpdate: (node: Node) => {
							if (flipped) return;
							const angle = new Vec3(0, 0, 0);
							node.rotation.getEulerAngles(angle);

							if (angle.x < 90) {
								node.getChildByPath('back').active = false;
								flipped = true;
							}
						},
					},
				)
				.call(resolve)
				.start();

			tween(this.cardNode)
				.parallel(translate, scale, rotate)
				.call(resolve)
				.start();
		});
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
		const { place, index } = core
			.queryById(this.entityId)
			.getComponent(LCT.CardPlace);
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
