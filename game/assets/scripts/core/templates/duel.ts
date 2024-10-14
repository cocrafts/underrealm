import type { ComponentMap, Config } from '../components';
import { CardPlace, ComponentType } from '../components';
import type { ExportedECS } from '../ecs';
import { ECS } from '../ecs';
import type { EventType } from '../events';

export const defaultSetting: Omit<Config, 'type'> = {
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
	config: Omit<Config, 'type'>,
	[firstPlayerId, secondPlayerId]: string[],
) => {
	const template = ECS.fromJSON<ComponentMap, EventType>(cardTemplate);

	const duelECS = new ECS();

	duelECS.createEntity().addComponent(ComponentType.Config, config);
	generatePlayer(duelECS, firstPlayerId, config.initialPlayerHealth);
	generatePlayer(duelECS, secondPlayerId, config.initialPlayerHealth);
	generateRandomDeck(duelECS, template, config.maxDeckSize, firstPlayerId);
	generateRandomDeck(duelECS, template, config.maxDeckSize, secondPlayerId);

	return duelECS;
};

const generatePlayer = (
	duel: ECS<ComponentMap, EventType>,
	playerId: string,
	playerHealth: number,
) => {
	duel.createEntity().addComponent(ComponentType.Player, {
		id: playerId,
		health: playerHealth,
	});
};

const generateRandomDeck = (
	duel: ECS<ComponentMap, EventType>,
	template: ECS<ComponentMap, EventType>,
	maxDeckSize: number,
	playerId: string,
) => {
	const cards = template.query(ComponentType.Metadata).exec();
	const maxSize = Math.floor(cards.length);
	const safeSize = Math.min(maxSize, maxDeckSize);
	let count = 0;

	while (count < safeSize) {
		const randomIndex = Math.floor(Math.random() * cards.length);
		const newCard = duel
			.createEntity()
			.addComponent(ComponentType.Ownership, { owner: playerId })
			.addComponent(ComponentType.Place, {
				index: count,
				place: CardPlace.Deck,
			});

		Object.keys(cards[randomIndex].components).forEach(
			(component: keyof ComponentMap) => {
				newCard.addComponent(
					component,
					cards[randomIndex].getComponent(component),
				);
			},
		);

		count++;
	}
};
