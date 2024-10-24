import { CardPlace, ComponentType, DuelPhase } from '../components';
import type { ECS } from '../ecs';
import {
	CardComponentNotFoundError,
	CardEntityNotFoundError,
	GroundLimitReachedError,
	InvalidCardOwnershipError,
	InvalidCardPlaceError,
	InvalidGroundIndexToSummonError,
	MaxSummonReachedError,
	PlayerEntityNotFoundError,
	UnexpectedTurnActionError,
} from '../error';
import type { EndTurnEvent, SummonCardEvent } from '../events';

export const endTurnEventHandler = () => {
	const handle = (ecs: ECS, event: EndTurnEvent) => {
		const { type, playerEntityId } = event;

		const player = ecs.queryById(playerEntityId);
		if (!player) {
			throw PlayerEntityNotFoundError(playerEntityId);
		}

		const playerId = player.getComponent(ComponentType.PlayerAttribute).userId;
		if (ecs.state.turnOf !== playerId) {
			throw UnexpectedTurnActionError(type, playerId, ecs.state.turnOf);
		}

		ecs.state.phase = DuelPhase.PreFight;
	};

	return { handle };
};

export const summonEventHandler = () => {
	const handle = (ecs: ECS, event: SummonCardEvent) => {
		const { type, playerEntityId, cardEntityId, groundIndex } = event;

		const player = ecs.queryById(playerEntityId);
		if (!player) {
			throw PlayerEntityNotFoundError(playerEntityId);
		}

		const playerId = player.getComponent(ComponentType.PlayerAttribute).userId;
		if (ecs.state.turnOf !== playerId) {
			throw UnexpectedTurnActionError(type, playerId, ecs.state.turnOf);
		}

		if (ecs.state.summonCount === ecs.config.perTurnSummon) {
			throw MaxSummonReachedError();
		}

		const card = ecs.queryById(cardEntityId);
		if (!card) {
			throw CardEntityNotFoundError(cardEntityId);
		}

		const cardPlace = card.getComponent(ComponentType.CardPlace);
		if (!cardPlace) {
			throw CardComponentNotFoundError(cardEntityId, ComponentType.CardPlace);
		} else if (cardPlace.place !== CardPlace.Hand) {
			throw InvalidCardPlaceError(
				cardEntityId,
				CardPlace.Hand,
				cardPlace.place,
			);
		}

		const cardOwner = card.getComponent(ComponentType.Ownership);
		if (!cardOwner) {
			throw CardComponentNotFoundError(cardEntityId, ComponentType.Ownership);
		} else if (cardOwner.owner !== playerId) {
			throw InvalidCardOwnershipError(cardEntityId, playerId, cardOwner.owner);
		}

		const cardsInGround = ecs
			.query(ComponentType.CardPlace, { place: CardPlace.Ground })
			.and(ComponentType.Ownership, { owner: playerId })
			.exec();
		if (cardsInGround.length === ecs.config.groundSize) {
			throw GroundLimitReachedError();
		}

		const groundIndexes = cardsInGround.map(
			(c) => c.getComponent(ComponentType.CardPlace).index,
		);
		const max = Math.max(...groundIndexes);
		const min = Math.min(...groundIndexes);
		if (groundIndex !== max + 1 || groundIndex !== min - 1) {
			throw InvalidGroundIndexToSummonError(groundIndex, [min, max]);
		}

		cardPlace.place = CardPlace.Ground;
		cardPlace.index = groundIndex;
	};

	return { handle };
};
