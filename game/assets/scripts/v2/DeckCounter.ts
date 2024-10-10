import { _decorator, Component, Enum, Label } from 'cc';

import { CardPlace, ComponentType } from '../core/components';
import { core, system } from '../game';
import { Owner } from '../util/v2/manager';
const { ccclass, property } = _decorator;

@ccclass('DeckCounter')
export class DeckCounter extends Component {
	@property({ type: Enum(Owner), editorOnly: true })
	private owner: number;

	start() {
		const owner = this.owner === Owner.Player ? system.playerId : undefined;

		const cards = core
			.query(ComponentType.Ownership, { owner })
			.and(ComponentType.Place, { place: CardPlace.Deck })
			.exec();

		const count = cards.length.toString();

		this.node.parent.getChildByPath('Count').getComponent(Label).string = count;
	}
}
