import type { CardPlace, CardType, ComponentType } from './components';

export class CoreError extends Error {}

export const PlayerEntityNotFoundError = (entityId: number) => {
	return new CoreError(`Invalid player entity id: ${entityId}`);
};

export const CardEntityNotFoundError = (entityId: number) => {
	return new CoreError(`Invalid card entity id: ${entityId}`);
};

export const CardComponentNotFoundError = (
	entityId: number,
	type: ComponentType,
) => {
	return new CoreError(
		`Component '${type}' not found in card entity '${entityId}'`,
	);
};

export const InvalidCardPlaceError = (
	entityId: number,
	expectedPlace: CardPlace,
	place: CardPlace,
) => {
	return new CoreError(
		`Invalid card place of '${entityId}'. Expect '${expectedPlace}, got '${place}'`,
	);
};

export const InvalidCardOwnershipError = (
	entityId: number,
	expectedOwner: string,
	owner: string,
) => {
	return new CoreError(
		`Invalid card place of '${entityId}'. Expect '${expectedOwner}, got '${owner}'`,
	);
};

export const UnexpectedTurnActionError = (
	action: string,
	playerId: string,
	turnOf: string,
) => {
	return new CoreError(
		`Can't take action '${action}' for player '${playerId}', expected turn of '${turnOf}'`,
	);
};

export const MaxSummonReachedError = (cardType: CardType) => {
	return new CoreError(`Reached max summon ${cardType} cards in this turn`);
};

export const GroundLimitReachedError = () => {
	return new CoreError(`The ground is full to summon`);
};

export const InvalidGroundIndexToSummonError = (
	index: number,
	expectedIndexes: number[],
) => {
	return new CoreError(
		`Invalid ground index to summon, expect '${expectedIndexes.join(',')}', got '${index}'`,
	);
};
