import {
	CardPlace,
	CardType,
	ComponentType as CT,
	DuelPhase,
} from '../components';
import type { ECS } from '../ecs';
import { cloneComponents, queryDeckCards, queryHandCards } from '../helper';

export const turnCardDraw = () => {
	const update = (ecs: ECS) => {
		if (ecs.state.phase !== DuelPhase.Draw) return;

		const { perTurnDraw } = ecs.config;
		const playerEntities = ecs.query(CT.PlayerAttribute).exec();
		playerEntities.forEach((entity) => {
			const player = entity.getComponent(CT.PlayerAttribute);
			const deck = queryDeckCards(ecs, player.userId);
			const hand = queryHandCards(ecs, player.userId);

			// Draw turn cards
			for (let i = 0; i < perTurnDraw; i++) {
				const card = deck[i];
				const cardPlace = card.getComponent(CT.CardPlace);
				cardPlace.place = CardPlace.Hand;
				cardPlace.index = hand.length + i;
				hand.push(card);
			}

			// Check if troop card already in hand
			const troopIndexInHand = hand.findIndex(
				(entity) =>
					entity.getComponent(CT.CardMetadata).kind === CardType.Troop,
			);

			if (troopIndexInHand !== -1) return;

			// Draw troop card
			const newTroop = ecs.createEntity();
			const [troopTemplate] = ecs
				.query(CT.CardClass, {
					kind: CardType.Troop,
				})
				.and(CT.CardMetadata, { name: 'Troop' })
				.and(CT.Template)
				.exec();

			cloneComponents(newTroop, troopTemplate);
			newTroop
				.removeComponent(CT.Template)
				.addComponent(CT.CardPlace, {
					place: CardPlace.Hand,
					index: hand.length,
				})
				.addComponent(CT.Ownership, { owner: player.userId });
		});

		ecs.state.phase = DuelPhase.Setup;
	};

	return { update };
};
