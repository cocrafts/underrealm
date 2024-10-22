import { _decorator, Component, Node, tween } from 'cc';

import { CardPlace, core, system } from '../game';
import { defaultCardScale, detailedCardScale } from '../tween/v2/card';
import { setCursor } from '../util/helper';
import { safeCardInHandPosition, safeCardUIState } from '../util/v2/guards';
import { queryPlaceOwnerById } from '../util/v2/queries';
const { ccclass, property } = _decorator;

const { MOUSE_ENTER, MOUSE_LEAVE } = Node.EventType;

@ccclass('CardDetail')
export class CardDetail extends Component {
	public entityId: number;

	@property({ type: Node, visible: false })
	public cardNode: Node;

	@property({ type: Node, visible: false })
	public handNode: Node;

	start() {
		this.cardNode.on(MOUSE_ENTER, () => this.onMouseEnter());
		this.cardNode.on(MOUSE_LEAVE, () => this.onMouseLeave());
	}

	onDestroy() {
		this.cardNode.off(MOUSE_ENTER);
		this.cardNode.off(MOUSE_LEAVE);
	}

	private onMouseEnter() {
		safeCardUIState(this.entityId, ({ dragging }) => {
			if (dragging) return;
			const { place, owner } = queryPlaceOwnerById(core, this.entityId);
			if (place === CardPlace.Hand && owner === system.playerId) {
				setCursor('grab');
				this.showDetailInHand();
			}
		});
	}

	private onMouseLeave() {
		safeCardUIState(this.entityId, ({ dragging }) => {
			if (dragging) return;
			const { place, owner } = queryPlaceOwnerById(core, this.entityId);
			if (place === CardPlace.Hand && owner === system.playerId) {
				setCursor('auto');
				this.hideDetailInHand();
			}
		});
	}

	private showDetailInHand() {
		safeCardInHandPosition(this.entityId, ({ position }) => {
			position.y = this.handNode.position.y + 168;
			const scale = detailedCardScale;
			tween(this.cardNode)
				.to(0.5, { position, scale }, { easing: 'expoInOut' })
				.start();
		});
	}

	private hideDetailInHand() {
		safeCardInHandPosition(this.entityId, ({ position }) => {
			const scale = defaultCardScale;
			tween(this.cardNode)
				.to(0.8, { position, scale }, { easing: 'expoInOut' })
				.start();
		});
	}
}
