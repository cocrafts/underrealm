import {
	ActivationType,
	CardPlace,
	CommandType,
	ComponentType as CT,
	DuelPhase,
} from '../../components';
import type { ECS } from '../../ecs';
import { getDuelManager, selectGround } from '../../helper';

const summon = () => {
	const update = (ecs: ECS) => {
		const duelManager = getDuelManager(ecs);
		if (duelManager.phase !== DuelPhase.Setup) return;

		const commands = ecs.query(CT.Command).exec();
		const lastCommand = commands[commands.length - 1].getComponent(CT.Command);
		const isValidSummonCommand =
			lastCommand.commandType === CommandType.Summon &&
			lastCommand.from.place === CardPlace.Hand &&
			lastCommand.to.place === CardPlace.Ground;

		if (!isValidSummonCommand) return;

		const [card] = ecs.query(CT.CardPlace, lastCommand.from).exec();
		const cardPlace = card.getComponent(CT.CardPlace);
		cardPlace.place = lastCommand.to.place;
		cardPlace.index = lastCommand.to.index;

		const summonActivation = card.getComponent(CT.SummonActivation);
		if (!summonActivation) return;

		card.addComponent(CT.SkillActivating, {
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
				.query(CT.CardPlace, {
					place: CardPlace.Ground,
					index: i,
				})
				.exec();

			if (!card2) {
				const playerEntities = ecs.query(CT.PlayerAttribute).exec();
				const players = playerEntities.map((entity) =>
					entity.getComponent(CT.PlayerAttribute),
				);
				const enemyPlayer = players.find(
					(player) => player.id !== card1.getComponent(CT.Ownership).owner,
				);
				const { attack } = card1.getComponent(CT.CardAttribute);
				enemyPlayer.health -= attack;

				// Handle Glory activation
				const checkGlory = Object.keys(card1.components).indexOf(
					CT.GloryActivation,
				);
				if (checkGlory === -1) return;

				card1.addComponent(CT.SkillActivating, {
					activationType: ActivationType.Glory,
				});
			}

			const attributes1 = card1.getComponent(CT.CardAttribute);
			const attributes2 = card2.getComponent(CT.CardAttribute);

			attributes2.health -= attributes1.attack - attributes2.defense;
			attributes1.health -= attributes2.attack - attributes1.defense;
		}
	};

	return { update };
};

export const endTurn = () => {
	const update = (ecs: ECS) => {
		const [endTurnCommand] = ecs
			.query(CT.Command, { commandType: CommandType.EndTurn })
			.exec();
		const duelManager = getDuelManager(ecs);

		if (!endTurnCommand || duelManager.phase !== DuelPhase.Setup) return;

		const [player1, player2] = ecs.query(CT.PlayerAttribute).exec();

		if (duelManager.turnOf == player1.getComponent(CT.PlayerAttribute).id) {
			duelManager.turnOf = player2.getComponent(CT.PlayerAttribute).id;
		} else {
			duelManager.turnOf = player1.getComponent(CT.PlayerAttribute).id;
			duelManager.phase = DuelPhase.PreFight;
		}
	};

	return { update };
};

export const changePhase = (phase: DuelPhase) => {
	const update = (ecs: ECS) => {
		const duelManager = getDuelManager(ecs);
		duelManager.phase = phase;
	};

	return { update };
};

export const cleanUp = () => {
	const update = (ecs: ECS) => {
		const duelManager = getDuelManager(ecs);
		if (duelManager.phase !== DuelPhase.CleanUp) return;

		// Increase charge
		const chargeableCards = ecs.query(CT.CardChargeable).exec();
		chargeableCards.forEach((card) => {
			const chargeActivation = card.getComponent(CT.ChargeActivation);
			if (chargeActivation.current === chargeActivation.threshold) return;

			chargeActivation.current++;
		});

		// Reallocate cards on ground
		const playerEntities = ecs.query(CT.PlayerAttribute).exec();
		playerEntities.forEach((entity) => {
			const player = entity.getComponent(CT.PlayerAttribute);
			const ground = selectGround(ecs, player.id);
			const centerCard = Math.floor(ground.length / 2);
			ground[centerCard].getComponent(CT.CardPlace).index = 5;
			for (let i = 1; i < Math.floor(ground.length / 2); i++) {
				ground[centerCard - i].getComponent(CT.CardPlace).index = 5 - i;
				ground[centerCard + i].getComponent(CT.CardPlace).index = 5 + i;
			}
		});
	};

	return { update };
};

export const actions = {
	summon,
	fight,
	endTurn,
	changePhase,
	cleanUp,
};
