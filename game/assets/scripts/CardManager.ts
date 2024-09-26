import type { CardState } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import type { Node, SpriteFrame } from 'cc';
import {
	_decorator,
	Animation,
	Component,
	Label,
	resources,
	RichText,
	Sprite,
	UIOpacity,
} from 'cc';

import { playAnimation } from './util/animation';
import {
	getClassUri,
	getFoilUri,
	getSkillDesc,
	getVisualUri,
	setCursor,
} from './util/helper';
import { system } from './util/system';

const { ccclass } = _decorator;
const { getCard } = Engine;

@ccclass('CardManager')
export class CardManager extends Component {
	unsubscribe: () => void;
	isMouseInside = false;
	cardId: string;
	animation: Animation;
	uiOpacity: UIOpacity;
	cardFront: Node;
	cardName: Label;
	cardHealth: Label;
	cardDefense: Label;
	cardAttack: Label;
	cardSkill: RichText;
	cardFoil: Sprite;
	cardVisual: Sprite;
	cardClass: Sprite;

	start(): void {
		this.cardFront = this.node.getChildByPath('front');
		this.animation = this.node.getComponent(Animation);
		this.uiOpacity = this.node.getComponent(UIOpacity);
		this.cardName = this.node.getChildByPath('front/name').getComponent(Label);
		this.cardAttack = this.node
			.getChildByPath('front/attack')
			.getComponent(Label);
		this.cardDefense = this.node
			.getChildByPath('front/defense')
			.getComponent(Label);
		this.cardHealth = this.node
			.getChildByPath('front/health')
			.getComponent(Label);
		this.cardSkill = this.node
			.getChildByPath('front/skill')
			.getComponent(RichText);
		this.cardFoil = this.node.getChildByPath('front/foil').getComponent(Sprite);
		this.cardVisual = this.node
			.getChildByPath('front/visual')
			.getComponent(Sprite);
		this.cardClass = this.node
			.getChildByPath('front/class')
			.getComponent(Sprite);

		if (this.cardId) {
			this.subscribeCardChange();
		}
	}

	onDestroy(): void {
		this.unsubscribe?.();
	}

	setCardId(id: string): void {
		if (id === this.cardId) return;
		this.cardId = id;

		if (id.indexOf('#') > 0) {
			if (this.cardFront) {
				this.subscribeCardChange();
			}
		} else {
			setTimeout(() => {
				const card = getCard(system.duel.cardMap, id);
				this.onStateChange({ id, ...card.attribute } as never, null);
			}, 200);
		}
	}

	subscribeCardChange(): void {
		this.unsubscribe?.();
		this.unsubscribe = system.duel.subscribe(
			`state#${this.cardId}`,
			this.onStateChange.bind(this),
			true,
		);
	}

	onStateChange(state: CardState, lastState: CardState): void {
		const card = getCard(system.duel.cardMap, state.id);
		const cardChanged =
			state.id.substring(0, 9) !== this.cardId.substring(0, 9);

		if (!lastState) {
			const title = card.title ? ` - ${card.title}` : '';

			this.cardName.string = `${card.name}${title}`;
			this.cardSkill.string = getSkillDesc(card.skill.template as never);
		}

		if (state.health !== lastState?.health) {
			this.cardHealth.string = String(state.health);
		}

		if (state.defense !== lastState?.defense) {
			this.cardDefense.string = String(state.defense);
		}

		if (state.attack !== lastState?.attack) {
			this.cardAttack.string = String(state.attack);
		}

		if (!lastState || cardChanged) {
			const visualUri = getVisualUri(card.id);
			const foilUri = getFoilUri(card.id);
			const classUri = getClassUri(card.class);

			resources.load<SpriteFrame>(visualUri, (err, frame) => {
				if (err) return;
				this.cardVisual.spriteFrame = frame;
			});

			resources.load<SpriteFrame>(foilUri, (err, frame) => {
				if (err) return;
				this.cardFoil.spriteFrame = frame;
			});

			resources.load<SpriteFrame>(classUri, (err, frame) => {
				if (err) return;
				this.cardClass.spriteFrame = frame;
			});
		}
	}

	showPreview(): void {
		playAnimation(system.globalNodes.cardPreview, 'fade-in');
		system.globalNodes.cardPreview.setPosition(0, -168);
	}

	hidePreview(): void {
		system.globalNodes.cardPreview.setPosition(190, 740);
	}

	onMouseEnter(): void {
		setCursor('grab');
		if (system.dragging) return;

		this.uiOpacity.opacity = 50;
		system.previewing = true;
		system.activeCard = this.node;
		system.globalNodes.cardPreview.setPosition(this.node.position.x, -168);

		playAnimation(system.globalNodes.cardPreview, 'fade-in');
	}

	onMouseLeave(): void {
		setCursor('auto');
		this.uiOpacity.opacity = 255;
	}
}
