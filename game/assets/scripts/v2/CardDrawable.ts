import { _decorator, Component, Node } from 'cc';

import { drawCard, drawExpoCard } from '../tween/v2/card';
import { safeCardInHandPosition } from '../util/v2/guards';
const { ccclass, property } = _decorator;

@ccclass('CardDrawable')
export class CardDrawable extends Component {
	public entityId: number;

	@property({ type: Node, visible: false })
	public cardNode: Node;

	@property({ type: Node, visible: false })
	public deckNode: Node;

	/**
	 * This drawing is only used for player cards, it will enable hover/drag flags after drawing
	 */
	public async drawExpo() {
		await safeCardInHandPosition(this.entityId, async ({ position }) => {
			await drawExpoCard({
				node: this.cardNode,
				from: this.deckNode.position,
				dest: position,
			});
		});
	}

	public async draw() {
		await safeCardInHandPosition(this.entityId, async ({ position }) => {
			await drawCard({
				node: this.cardNode,
				from: this.deckNode.position,
				dest: position,
			});
		});
	}
}
