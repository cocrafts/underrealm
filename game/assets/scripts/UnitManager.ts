import Engine, { CardState } from '@metacraft/murg-engine';
import {
	_decorator,
	Component,
	Node,
	resources,
	Sprite,
	SpriteFrame,
	UIOpacity,
} from 'cc';

import { updateUnit } from './util/attribute';
import { getFoilUri, getVisualUri, setCursor } from './util/helper';
import { playEffectSound } from './util/resources';
import { system } from './util/system';
import { CardManager } from './CardManager';
import { raiseUnitPreview } from './tween';

const { ccclass } = _decorator;
const { getCard, getCardState, ActivationType } = Engine;
const NodeEvents = Node.EventType;

@ccclass('UnitManager')
export class UnitManager extends Component {
	unsubscribe: () => void;
	cardId: string;
	uiOpacity: UIOpacity;
	cardFoil: Sprite;
	cardVisual: Sprite;
	cardAttack: Node;
	cardDefense: Node;
	cardHealth: Node;

	start(): void {
		this.uiOpacity = this.node.getComponent(UIOpacity);
		this.cardFoil = this.node.getChildByPath('front/foil').getComponent(Sprite);
		this.cardVisual = this.node
			.getChildByPath('front/visual')
			.getComponent(Sprite);
		this.cardAttack = this.node.getChildByPath('front/attack');
		this.cardDefense = this.node.getChildByPath('front/defense');
		this.cardHealth = this.node.getChildByPath('front/health');

		if (this.cardId) {
			this.renderCard(getCardState(system.duel.stateMap, this.cardId));
		}

		this.node.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.node.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
	}

	setCardId(id: string): void {
		if (id === this.cardId) return;
		this.cardId = id;
	}

	renderCard(state: CardState): void {
		if (!this.cardFoil) return;

		const card = getCard(system.duel.cardMap, state.id);
		const visualUri = getVisualUri(card.id);
		const foilUri = getFoilUri(card.id, '-ground');

		resources.load<SpriteFrame>(visualUri, (err, frame) => {
			if (err) return;
			this.cardVisual.spriteFrame = frame;
		});

		resources.load<SpriteFrame>(foilUri, (err, frame) => {
			if (err) return;
			this.cardFoil.spriteFrame = frame;
		});

		if (card.skill?.activation === ActivationType.Charge) {
			this.node.getChildByPath('front/charge').active = true;
		}

		updateUnit(state.id);
	}

	onMouseEnter(): void {
		setCursor('pointer');

		if (system.winner || system.dragging || !this.cardId) return;
		if (this.node.getChildByPath('back')?.active) return;

		const cardNode = system.globalNodes.cardPreview.getChildByPath('Card');
		const glowNode = system.globalNodes.cardPreview.getChildByPath('Card/glow');

		glowNode.active = false;
		playEffectSound('card-raise', 0.2);
		raiseUnitPreview(system.globalNodes.cardPreview, this.node);
		cardNode.getComponent(CardManager).setCardId(this.cardId.substring(0, 9));
	}

	onMouseLeave(): void {
		setCursor('auto');
		system.globalNodes.cardPreview.setPosition(190, 740);
	}
}
