import type { EventMouse } from 'cc';
import { _decorator, CCInteger, Component, find, Node, tween, Vec3 } from 'cc';

import { defaultCardScale } from '../tween/v2/card';
import {
	safe,
	safeCardInHandPosition,
	safeCardUIState,
} from '../util/v2/guards';

const { ccclass, property } = _decorator;

const { MOUSE_UP, MOUSE_DOWN, MOUSE_MOVE } = Node.EventType;

@ccclass('CardSummonable')
export class CardSummonable extends Component {
	@property(CCInteger)
	public entityId: number;

	@property(Node)
	public cardNode: Node;

	private moveOffset = new Vec3();
	private mouseUpCallback: Function = () => this.onMouseUp();
	private mouseMoveCallback: Function = (e: EventMouse) => this.onMouseMove(e);
	private mouseDownCallback: Function = (e: EventMouse) => this.onMouseDown(e);

	initialize() {
		this.cardNode.on(MOUSE_DOWN, this.mouseDownCallback);
		find('Canvas').on(MOUSE_MOVE, this.mouseMoveCallback);
		find('Canvas').on(MOUSE_UP, this.mouseUpCallback);
	}

	onDestroy() {
		this.cardNode.off(MOUSE_DOWN);
		find('Canvas').off(MOUSE_MOVE, this.mouseMoveCallback);
		find('Canvas').off(MOUSE_UP, this.mouseUpCallback);
	}

	private onMouseDown(e: EventMouse) {
		const { x, y } = e.getUILocation();
		this.cardNode.getWorldPosition(this.moveOffset).subtract3f(x, y, 0);

		safeCardUIState(this.entityId, (UIState) => {
			UIState.dragging = true;
		});
	}

	private onMouseUp() {
		safe(safeCardUIState, safeCardInHandPosition).exec(
			this.entityId,
			(UIState, { position }) => {
				const scale = defaultCardScale;
				tween(this.cardNode)
					.to(0.5, { position, scale }, { easing: 'expoInOut' })
					.call(() => {
						UIState.dragging = false;
					})
					.start();
			},
		);
	}

	private onMouseMove(e: EventMouse) {
		safeCardUIState(this.entityId, ({ dragging }) => {
			if (!dragging) return;
			const { x, y } = e.getUILocation();
			this.cardNode.setWorldPosition(new Vec3(x, y, 0).add(this.moveOffset));
		});
	}
}
