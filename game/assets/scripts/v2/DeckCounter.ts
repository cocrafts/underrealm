import { _decorator, Component, Enum, Label, Node } from 'cc';

import {
	CardPlace,
	core,
	GameComponentType as GCT,
	LogicComponentType,
	system,
} from '../game';
import { Owner } from '../util/v2/manager';
const { ccclass, property } = _decorator;

@ccclass('DeckCounter')
export class DeckCounter extends Component {
	@property({ type: Enum(Owner) })
	private owner: number;

	@property(Node)
	private counterNode: Node;

	start() {
		const { playerId, enemyId } = system;
		const owner = this.owner === Owner.Player ? playerId : enemyId;
		const node = this.counterNode;

		core.createEntity().addComponent(GCT.DeckCounter, { node, owner });
		core.update();
	}
}

core.addSystem({
	update(ecs) {
		const counters = ecs.query(GCT.DeckCounter).exec();
		counters.forEach((counter) => {
			const { node, owner } = counter.getComponent(GCT.DeckCounter);

			const cards = ecs
				.query(LogicComponentType.Ownership, { owner })
				.and(LogicComponentType.Place, { place: CardPlace.Deck })
				.exec();

			const count = cards.length.toString();

			node.getComponent(Label).string = count;
		});
	},
});
