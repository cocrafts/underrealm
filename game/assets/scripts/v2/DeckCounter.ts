import { _decorator, Component, Enum } from 'cc';

import { core, createGameComponent, GameComponentType, system } from '../game';
import { Owner } from '../util/v2/manager';
const { ccclass, property } = _decorator;

@ccclass('DeckCounter')
export class DeckCounter extends Component {
	@property({ type: Enum(Owner), editorOnly: true })
	private owner: number;

	start() {
		const ownerId =
			this.owner === Owner.Player ? system.playerId : system.enemyId;
		const node = this.node.parent.getChildByPath('Count');

		core.createEntity().addComponent(
			createGameComponent(GameComponentType.DeckCounter, {
				node,
				ownerId,
			}),
		);
	}
}
