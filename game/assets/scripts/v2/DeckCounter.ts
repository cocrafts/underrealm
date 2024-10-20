import { _decorator, Component, Enum, Label, Node } from 'cc';

import type { GameECS } from '../game';
import { CardPlace, core, GCT, LCT, system } from '../game';
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
	}

	static updateDeckCountersSystem() {
		const update = (ecs: GameECS) => {
			const counters = ecs.query(GCT.DeckCounter).exec();
			counters.forEach((counter) => {
				const { node, owner } = counter.getComponent(GCT.DeckCounter);
				const cards = ecs
					.query(LCT.Ownership, { owner })
					.and(LCT.CardPlace, { place: CardPlace.Deck })
					.exec();

				node.getComponent(Label).string = cards.length.toString();
			});
		};

		return { update };
	}
}
