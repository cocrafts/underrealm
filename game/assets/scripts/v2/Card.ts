import { _decorator, CCInteger, Component } from 'cc';

import { core, GCT } from '../game';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {
	@property(CCInteger)
	public entityId: number;

	start() {
		core
			.queryById(this.entityId)
			.addComponent(GCT.CardNode, { node: this.node });
	}
}
