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
import { playEffectSound } from '../util/resources';
const { ccclass, property } = _decorator;

const FROM_PLAYER_DECK = new Vec3(425, -232, 0);
const TO_EXPO = new Vec3(440, -15, 0);
const TO_PLAYER_HAND = new Vec3(0, -360, 0);
const FROM_ENEMY_DECK = new Vec3(-425, 232, 0);
const TO_ENEMY_HAND = new Vec3(0, 360, 0);

@ccclass('Card')
export class Card extends Component {
	@property(CCInteger)
	public entityId: number;

	@property({ type: Node, editorOnly: true })
	public cardNode: Node;

	@property({ type: Node, editorOnly: true })
	public glowNode: Node;

	@property(Node)
	private groundNode: number;

	onLoad(): void {
		if (!this.glowNode) {
			console.error('Glow node not found in this card', this.entityId);
		} else if (!this.cardNode) {
			console.error('Card node not found in this card', this.entityId);
		}
	}

	start() {
		this.cardNode.on(Node.EventType.MOUSE_ENTER, () => {
			this.glowOn();
		});

		this.cardNode.on(Node.EventType.MOUSE_LEAVE, () => {
			this.glowOff();
		});
	}

	public drawToPlayerHand() {
		const cardsInHand = core
			.query(LCT.CardPlace, { place: CardPlace.Hand })
			.and(LCT.Ownership, { owner: system.playerId })
			.exec();
		const centerIndex = Math.floor(cardsInHand.length / 2);
		const card = core.queryById(this.entityId);
		const index = card.getComponent(LCT.CardPlace).index;
		const dest = TO_PLAYER_HAND.clone().add(
			new Vec3((index - centerIndex) * 80, 0, index),
		);

		return new Promise<void>((resolve) => {
			animateExpoCard({
				node: this.cardNode,
				from: FROM_PLAYER_DECK,
				dest: TO_EXPO,
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
		const cardsInHand = core
			.query(LCT.CardPlace, { place: CardPlace.Hand })
			.and(LCT.Ownership, { owner: system.enemyId })
			.exec();
		const centerIndex = Math.floor(cardsInHand.length / 2);
		const card = core.queryById(this.entityId);
		const index = card.getComponent(LCT.CardPlace).index;
		const delay = index * 0.2;
		const dest = TO_ENEMY_HAND.clone().add(
			new Vec3((index - centerIndex) * 80, 0, index),
		);

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
}
