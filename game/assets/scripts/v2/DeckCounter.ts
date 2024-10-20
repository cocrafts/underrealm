import { _decorator, Component, Enum, Label, Node } from 'cc';

import type { GameECS } from '../game';
import { CardPlace, core, GCT, system } from '../game';
import { Owner } from '../util/v2/manager';
import { queryCards } from '../util/v2/queries';
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
		core
			.createEntity()
			.addComponent(GCT.DeckCounter, { node: this.node, owner });
	}

	static updateDeckCountersSystem() {
		const update = (core: GameECS) => {
			const counters = core.query(GCT.DeckCounter).exec();
			counters.forEach((counter) => {
				const { node, owner } = counter.getComponent(GCT.DeckCounter);
				const cardsInDeck = queryCards(core, owner, CardPlace.Deck);
				const counterNode = node.getComponent(DeckCounter).counterNode;
				counterNode.getComponent(Label).string = cardsInDeck.length.toString();
			});
		};

		return { update };
	}
}
