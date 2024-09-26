import Engine from '@underrealm/murg';
import type { EventMouse, UIOpacity } from 'cc';
import { _decorator, Component, Node, Vec2 } from 'cc';

import { cardIdFromNode, setCursor } from './util/helper';
import { system } from './util/system';
import { raiseHandCard } from './tween';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;
const { CardType, getCard, selectPlayer } = Engine;

interface Props {
	card?: Node;
	dragging?: boolean;
	dragOffset?: Vec2;
}

@ccclass('PreviewManager')
export class PreviewManager extends Component {
	props: Props = {};

	start(): void {
		this.props.card = this.node.getChildByPath('Card');
		this.node.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.node.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.node.on(NodeEvents.MOUSE_DOWN, this.onMouseDown.bind(this));
		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseEnter(): void {
		this.props.dragging = false;
		setCursor('grab');
	}

	onMouseLeave(): void {
		setCursor('auto');
		this.hidePreview();
	}

	onMouseDown(e: EventMouse): void {
		this.props.dragging = true;
		this.props.dragOffset = e.getLocation();
	}

	onMouseUp(): void {
		this.props.dragging = false;
	}

	onMouseMove(e: EventMouse): void {
		if (!this.props.dragging || !system.isCommandAble) return;

		const location = e.getLocation();
		const distance = Vec2.distance(location, this.props.dragOffset);

		if (distance > 5) {
			const cardId = cardIdFromNode(system.activeCard);
			const card = getCard(system.duel.cardMap, cardId);
			const player = selectPlayer(system.duel, system.playerIds.me);

			if (card.kind === CardType.Hero && player.perTurnHero <= 0) return;

			this.hidePreview();
			system.dragging = true;
		}
	}

	hidePreview(): void {
		this.node.setPosition(190, 740);

		if (system.activeCard) {
			raiseHandCard(system.activeCard, 0, 0.02);
			const uiOpacity = system.activeCard.getComponent(
				'cc.UIOpacity',
			) as UIOpacity;
			uiOpacity.opacity = 255;
		}
	}
}
