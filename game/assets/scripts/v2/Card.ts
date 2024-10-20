import {
	_decorator,
	CCInteger,
	Component,
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

const FROM_ENEMY_DECK = new Vec3(-425, 232, 0);
const TO_ENEMY_HAND = new Vec3(0, 360, 0);

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

	private allowDrag: boolean;

	private dragging: boolean;

	start() {
		this.cardNode.on(Node.EventType.MOUSE_ENTER, () => this.onMouseEnter());
		this.cardNode.on(Node.EventType.MOUSE_LEAVE, () => this.onMouseLeave());
		this.cardNode.on(Node.EventType.MOUSE_UP, () => this.onMouseUp());
		this.cardNode.on(Node.EventType.MOUSE_DOWN, () => this.onMouseDown());
	}

	onDestroy() {
		this.cardNode.off(Node.EventType.MOUSE_ENTER);
		this.cardNode.off(Node.EventType.MOUSE_LEAVE);
		this.cardNode.off(Node.EventType.MOUSE_UP);
		this.cardNode.off(Node.EventType.MOUSE_DOWN);
	}

	private onMouseEnter() {
		const card = core.queryById(this.entityId);
		const { place } = card.getComponent(LCT.CardPlace);
		const { owner } = card.getComponent(LCT.Ownership);

		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('grab');
			this.showDetailOnHand();
		}
	}

	private showDetailOnHand() {
		const position = new Vec3(
			this.cardNode.position.x,
			this.handNode.position.y + 168,
			100,
		);
		const scale = new Vec3(0.6, 0.6, 1);
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	private onMouseLeave() {
		const card = core.queryById(this.entityId);
		const { place } = card.getComponent(LCT.CardPlace);
		const { owner } = card.getComponent(LCT.Ownership);

		if (place === CardPlace.Hand && owner === system.playerId) {
			setCursor('auto');
			this.hideDetailOnHand();
		}
	}

	private hideDetailOnHand() {
		const { index } = core.queryById(this.entityId).getComponent(LCT.CardPlace);
		const position = new Vec3(
			this.cardNode.position.x,
			this.handNode.position.y,
			index,
		);
		const scale = new Vec3(0.4, 0.4, 1);
		tween(this.cardNode)
			.to(0.5, { position, scale }, { easing: 'expoInOut' })
			.start();
	}

	private onMouseUp() {}

	private onMouseDown() {}

	public drawToPlayerHand() {
		const cardsInHand = queryCards(core, system.playerId, CardPlace.Hand);
		const { index } = core.queryById(this.entityId).getComponent(LCT.CardPlace);
		const dest = this.cardPositionOnPlayerHand(index, cardsInHand.length);

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
					resolve();
				})
				.start();
		});
	}

	public drawToEnemyHand(): Promise<void> {
		const cardsInHand = queryCards(core, system.enemyId, CardPlace.Hand);
		const { index } = core.queryById(this.entityId).getComponent(LCT.CardPlace);
		const delay = index * 0.2;
		const dest = this.cardPositionOnEnemyHand(index, cardsInHand.length);

		return new Promise<void>((resolve) => {
			const r1 = Quat.fromEuler(new Quat(), 0, 0, 90);
			const r2 = Quat.fromEuler(new Quat(), 0, 0, 180);
			tween(this.cardNode)
				.delay(delay)
				.call(() => playEffectSound('card-flip', 0.3))
				.set({
					position: FROM_ENEMY_DECK,
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

	private cardPositionOnPlayerHand(index: number, total: number): Vec3 {
		const centerIndex = Math.floor(total / 2);
		const xPad = (index - centerIndex) * 80;
		const playerHandPosition = this.handNode.position.clone();
		const position = playerHandPosition.add3f(xPad, 0, index);

		return position;
	}

	private cardPositionOnEnemyHand(index: number, total: number): Vec3 {
		const centerIndex = Math.floor(total / 2);
		const xPad = (index - centerIndex) * 80;
		const position = TO_ENEMY_HAND.clone().add3f(xPad, 0, index);

		return position;
	}
}
