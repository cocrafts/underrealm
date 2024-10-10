import { _decorator, Component, Enum, Label } from 'cc';

import {
	CardPlace,
	core,
	GameComponentType,
	LogicComponentType,
	system,
} from '../game';
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

		core
			.createEntity()
			.addComponent(GameComponentType.DeckCounter, { node, ownerId });

		core.addSystem({
			update(ecs) {
				const counters = ecs.query(GameComponentType.DeckCounter).exec();
				counters.forEach((counter) => {
					const { node, ownerId } = counter.getComponent(
						GameComponentType.DeckCounter,
					);

					const cards = ecs
						.query(LogicComponentType.Ownership, { owner: ownerId })
						.and(LogicComponentType.Place, { place: CardPlace.Deck })
						.exec();

					node.getComponent(Label).string = cards.length.toString();
				});
			},
		});
	}
}
