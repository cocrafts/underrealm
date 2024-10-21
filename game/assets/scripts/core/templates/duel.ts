import type { ComponentMap } from '../components';
import { CardPlace, CardType, ComponentType, DuelPhase } from '../components';
import type { Config, ExportedECS } from '../ecs';
import { ECS } from '../ecs';
import type { EventType } from '../events';
import { cloneComponents } from '../helper';

export const defaultSetting: Config = {
	initialCardCount: 5,
	initialPlayerHealth: 150,
	elementalFactor: 0.1,
	handSize: 9,
	groundSize: 11,
	maxDeckSize: 30,
	maxAttachment: 2,
	spellIncreaseCycle: 3,
	perTurnDraw: 1,
	perTurnHero: 1,
	perTurnSpell: 2,
	perTurnTroop: 1,
};

export const initializeDuel = (
	cardTemplate: ExportedECS,
	config: Config,
	[firstPlayer, secondPlayer]: Array<{ id: string }>,
) => {
	const template = ECS.fromJSON<ComponentMap, EventType>(cardTemplate);
	const duelECS = new ECS(config);

	duelECS.createEntity().addComponent(ComponentType.DuelManager, {
		phase: DuelPhase.InitialDistribution,
		turnOf: firstPlayer.id,
	});

	const troopTemplates = template
		.query(ComponentType.CardMetadata, { kind: CardType.Troop })
		.and(ComponentType.Template)
		.exec();

	troopTemplates.forEach((troopTemplate) => {
		const troop = duelECS.createEntity();
		cloneComponents(troop, troopTemplate);
		troop.addComponent(
			ComponentType.CardAttribute,
			troopTemplate.getComponent(ComponentType.CardOriginalAttribute),
		);
	});

	duelECS.createEntity().addComponent(ComponentType.PlayerAttribute, {
		id: firstPlayer.id,
		health: duelECS.config.initialPlayerHealth,
	});
	duelECS.createEntity().addComponent(ComponentType.PlayerAttribute, {
		id: secondPlayer.id,
		health: duelECS.config.initialPlayerHealth,
	});

	const heroCards = template
		.query(ComponentType.CardMetadata, { kind: CardType.Hero })
		.exec();
	[firstPlayer, secondPlayer].forEach((player) => {
		const maxSize = Math.floor(heroCards.length);
		const safeSize = Math.min(maxSize, duelECS.config.maxDeckSize);
		const count = 0;

		while (count < safeSize) {
			const randomIndex = Math.floor(Math.random() * heroCards.length);
			const newCard = duelECS
				.createEntity()
				.addComponent(ComponentType.CardOwnership, { owner: player.id })
				.addComponent(ComponentType.CardPlace, {
					index: count,
					place: CardPlace.Deck,
				})
				.addComponent(
					ComponentType.CardAttribute,
					heroCards[randomIndex].getComponent(
						ComponentType.CardOriginalAttribute,
					),
				);

			cloneComponents(newCard, heroCards[randomIndex]);
		}
	});
	return duelECS;
};
