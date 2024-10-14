import type { ComponentMap } from '../components';
import { CardPlace, ComponentType, DuelPhase } from '../components';
import type { ECS, Entity } from '../ecs';

const drawCards = (entities: Entity<ComponentMap>[], initialCards: number) => {
	for (let i = 0; i < initialCards; i++) {
		entities[i].getComponent(ComponentType.Place).place = CardPlace.Hand;
	}
};

export const initialCardDraw = () => {
	const update = (ecs: ECS) => {
		const [duelManager] = ecs.query(ComponentType.DuelManager).exec();
		const duelManagerComp = duelManager.getComponent(ComponentType.DuelManager);

		if (duelManagerComp.phase !== DuelPhase.InitialDistribution) return;

		const [player1, player2] = ecs.query(ComponentType.Player).exec();
		const [config] = ecs.query(ComponentType.Config).exec();
		const initialCards = config.getComponent(
			ComponentType.Config,
		).initialCardCount;

		const firstDeck = ecs
			.query(ComponentType.Metadata)
			.and(ComponentType.Place, { place: CardPlace.Deck })
			.and(ComponentType.Ownership, {
				owner: player1.getComponent(ComponentType.Player).id,
			})
			.exec();
		const secondDeck = ecs
			.query(ComponentType.Metadata)
			.and(ComponentType.Place, { place: CardPlace.Deck })
			.and(ComponentType.Ownership, {
				owner: player2.getComponent(ComponentType.Player).id,
			})
			.exec();

		drawCards(firstDeck, initialCards);
		drawCards(secondDeck, initialCards);
		duelManagerComp.phase = DuelPhase.Draw;
	};

	return { update };
};
