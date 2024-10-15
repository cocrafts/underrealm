import type { ComponentMap } from '../components';
import { CardPlace, CardType, ComponentType, DuelPhase } from '../components';
import type { ECS, Entity } from '../ecs';
import { cloneEntity, selectDeck, selectHand } from '../helper';

const drawCards = (
	entities: Entity<ComponentMap>[],
	numberOfCards: number,
	handIndex: number,
) => {
	for (let i = 0; i < numberOfCards; i++) {
		const cardPlace = entities[i].getComponent(ComponentType.Place);
		cardPlace.place = CardPlace.Hand;
		cardPlace.index = handIndex + i;
	}
};
};

export const initialCardDraw = () => {
	const update = (ecs: ECS) => {
		const [duelManager] = ecs.query(ComponentType.DuelManager).exec();
		const duelManagerComp = duelManager.getComponent(ComponentType.DuelManager);

		if (duelManagerComp.phase !== DuelPhase.InitialDistribution) return;

		const [player1, player2] = ecs.query(ComponentType.Player).exec();
		const [config] = ecs.query(ComponentType.Config).exec();
		const { initialCardCount } = config.getComponent(ComponentType.Config);

		const firstDeck = selectDeck(
			ecs,
			player1.getComponent(ComponentType.Player).id,
		);
		const firstHand = selectHand(
			ecs,
			player1.getComponent(ComponentType.Player).id,
		);
		const secondDeck = selectDeck(
			ecs,
			player2.getComponent(ComponentType.Player).id,
		);
		const secondHand = selectHand(
			ecs,
			player2.getComponent(ComponentType.Player).id,
		);

		drawCards(firstDeck, initialCardCount, firstHand.length);
		drawCards(secondDeck, initialCardCount, secondHand.length);
		duelManagerComp.phase = DuelPhase.Draw;
	};

	return { update };
};
