import { _decorator, Component, Enum, Label, Node } from 'cc';

import type { GameECS } from '../game';
import { GCT, LCT, system } from '../game';
import { core } from '../game';
import { Owner } from '../util/v2/manager';
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

		core.createEntity().addComponent(GCT.PlayerController, {
			healthNode: this.healthNode,
			healthPredictNode: this.healthPredictNode,
			owner,
		});
	}

	static updatePlayersAttributeSystem() {
		const update = (ecs: GameECS) => {
			const players = ecs.query(GCT.PlayerController).exec();
			players.forEach((player) => {
				const { healthNode, owner } = player.getComponent(GCT.PlayerController);

				const playerAttribute = ecs
					.query(LCT.Ownership, { owner })
					.and(LCT.PlayerAttribute)
					.exec()
					.first()
					.getComponent(LCT.PlayerAttribute);

				healthNode.getComponent(Label).string =
					playerAttribute.health.toString();
			});
		};

		return { update };
	}
}
