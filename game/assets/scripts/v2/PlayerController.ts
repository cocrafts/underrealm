import { _decorator, Component, Enum, Label, Node } from 'cc';

import type { GameECS } from '../game';
import { GCT, system } from '../game';
import { core } from '../game';
import { Owner } from '../util/v2/manager';
import { queryPlayerAttribute } from '../util/v2/queries';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
	@property({ type: Enum(Owner) })
	private owner: number;

	@property(Node)
	private healthNode: Node;

	@property(Node)
	private healthPredictNode: Node;

	start() {
		const { playerId, enemyId } = system;
		const owner = this.owner === Owner.Player ? playerId : enemyId;

		core
			.createEntity()
			.addComponent(GCT.PlayerController, { node: this.node, owner });
	}

	static updatePlayersAttributeSystem() {
		const update = (core: GameECS) => {
			const players = core.query(GCT.PlayerController).exec();
			players.forEach((player) => {
				const { node, owner } = player.getComponent(GCT.PlayerController);
				const { health } = queryPlayerAttribute(core, owner);
				const healthNode = node.getComponent(PlayerController).healthNode;
				healthNode.getComponent(Label).string = health.toString();
			});
		};

		return { update };
	}
}
