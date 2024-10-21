import {
	ActivationType,
	CardPlace,
	CommandType,
	ComponentType,
	DuelPhase,
} from '../../components';
import type { ECS } from '../../ecs';
import { getDuelManager } from '../../helper';

const summon = () => {
	const update = (ecs: ECS) => {
		const duelManager = getDuelManager(ecs);
		if (duelManager.phase !== DuelPhase.Setup) return;

		const commands = ecs.query(ComponentType.Command).exec();
		const lastCommand = commands[commands.length - 1].getComponent(
			ComponentType.Command,
		);
		const isValidSummonCommand =
			lastCommand.commandType === CommandType.Summon &&
			lastCommand.from.place === CardPlace.Hand &&
			lastCommand.to.place === CardPlace.Ground;

		if (!isValidSummonCommand) return;

		const [card] = ecs.query(ComponentType.CardPlace, lastCommand.from).exec();
		const cardPlace = card.getComponent(ComponentType.CardPlace);
		cardPlace.place = lastCommand.to.place;
		cardPlace.index = lastCommand.to.index;

		const summonActivation = card.getComponent(ComponentType.SummonActivation);
		if (!summonActivation) return;

		card.addComponent(ComponentType.SkillActivating, {
			activationType: ActivationType.Summon,
		});
	};

	return { update };
};

const fight = () => {
	const update = (ecs: ECS) => {
		const duelManager = getDuelManager(ecs);
		if (duelManager.phase !== DuelPhase.Fight) return;

		const { groundSize } = ecs.config;
		for (let i = 0; i < groundSize; i++) {
			const [card1, card2] = ecs
				.query(ComponentType.CardPlace, {
					place: CardPlace.Ground,
					index: i,
				})
				.exec();

			if (!card2) {
				const playerEntities = ecs.query(ComponentType.PlayerAttribute).exec();
				const players = playerEntities.map((entity) =>
					entity.getComponent(ComponentType.PlayerAttribute),
				);
				const enemyPlayer = players.find(
					(player) =>
						player.id !== card1.getComponent(ComponentType.CardOwnership).owner,
				);
				const { attack } = card1.getComponent(ComponentType.CardAttribute);
				enemyPlayer.health -= attack;

				// Handle Glory activation
				const checkGlory = Object.keys(card1.components).indexOf(
					ComponentType.GloryActivation,
				);
				if (checkGlory === -1) return;

				card1.addComponent(ComponentType.SkillActivating, {
					activationType: ActivationType.Glory,
				});
			}

			const attributes1 = card1.getComponent(ComponentType.CardAttribute);
			const attributes2 = card2.getComponent(ComponentType.CardAttribute);

			attributes2.health -= attributes1.attack - attributes2.defense;
			attributes1.health -= attributes2.attack - attributes1.defense;
		}
	};

	return { update };
};

export const endTurn = () => {
	const update = (ecs: ECS) => {
		const [endTurnCommand] = ecs
			.query(ComponentType.Command, { commandType: CommandType.EndTurn })
			.exec();
		const duelManager = getDuelManager(ecs);

		if (!endTurnCommand || duelManager.phase !== DuelPhase.Setup) return;

		const [player1, player2] = ecs.query(ComponentType.PlayerAttribute).exec();

		if (
			duelManager.turnOf ==
			player1.getComponent(ComponentType.PlayerAttribute).id
		) {
			duelManager.turnOf = player2.getComponent(
				ComponentType.PlayerAttribute,
			).id;
		} else {
			duelManager.turnOf = player1.getComponent(
				ComponentType.PlayerAttribute,
			).id;
			duelManager.phase = DuelPhase.PreFight;
		}
	};

	return { update };
};

export const changePhase = (phase: DuelPhase) => {
	const update = (ecs: ECS) => {
		const [duelManager] = ecs.query(ComponentType.DuelManager).exec();
		duelManager.getComponent(ComponentType.DuelManager).phase = phase;
	};

	return { update };
};

export const actions = {
	summon,
	fight,
	endTurn,
	changePhase,
};
