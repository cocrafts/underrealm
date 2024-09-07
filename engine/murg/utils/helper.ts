import type { Attribute, DuelCommand, DuelState, PlayerState } from './type';
import { DuelPlace, ElementalType } from './type';

export const nanoId = () => {
	return 'xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

export const getPlaceDisplay = (place: DuelPlace) => {
	switch (place) {
		case DuelPlace.Deck:
			return 'Deck';
		case DuelPlace.Hand:
			return 'Hand';
		case DuelPlace.Ground:
			return 'Ground';
		case DuelPlace.Grave:
			return 'Graveyard';
		case DuelPlace.Ability:
			return 'Ability';
		case DuelPlace.Player:
			return 'Player';
		default:
			return 'Void';
	}
};

export const getElementalDisplay = (elemental: ElementalType) => {
	switch (elemental) {
		case ElementalType.Metal:
			return 'Metal';
		case ElementalType.Wood:
			return 'Wood';
		case ElementalType.Water:
			return 'Water';
		case ElementalType.Fire:
			return 'Fire';
		case ElementalType.Earth:
			return 'Earth';
		case ElementalType.Light:
			return 'Light';
		case ElementalType.Dark:
			return 'Dark';
		default:
			return 'None';
	}
};

export interface CommandResult {
	commands: DuelCommand[];
	registerCommand: (command: DuelCommand) => void;
}

export const createCommandResult = (
	defaults: DuelCommand[] = [],
): CommandResult => {
	return {
		commands: defaults,
		registerCommand: (i) => defaults.push(i),
	};
};

export const createDuelFragment = ({
	uniqueCardCount,
}: DuelState): Partial<DuelState> => {
	return {
		uniqueCardCount,
		stateMap: {},
	};
};

export const selectPlayer = (state: DuelState, owner: string): PlayerState => {
	if (!owner) return;
	if (state.firstPlayer.id === owner) {
		return state.firstPlayer;
	}

	return state.secondPlayer;
};

export interface PlayerClone {
	key: string;
	state: PlayerState;
}

export const clonePlayer = (state: DuelState, owner: string): PlayerClone => {
	const isFirst = state.firstPlayer.id === owner;
	const player = selectPlayer(state, owner);

	return {
		key: isFirst ? 'firstPlayer' : 'secondPlayer',
		state: { ...player },
	};
};

export const selectStateKey = (
	duel: DuelState,
	owner: string,
	source: DuelPlace = DuelPlace.Player,
) => {
	if (!owner) return;
	if (duel.firstPlayer.id === owner) {
		return `first${source}`;
	}

	return `second${source}`;
};

export const selectState = (
	duel: DuelState,
	owner: string,
	source: DuelPlace,
): string[] => {
	if (!owner) return;
	return duel[selectStateKey(duel, owner, source)];
};

export interface StateClone {
	key: string;
	state: string[];
}

export const cloneState = (
	state: DuelState,
	owner: string,
	source: DuelPlace,
): StateClone => {
	const isFirst = state.firstPlayer.id === owner;
	const firstSource = `first${source}`;
	const secondSource = `second${source}`;
	const selectedState = selectState(state, owner, source) as string[];

	return {
		key: isFirst ? firstSource : secondSource,
		state: [...selectedState],
	};
};

export const selectDeck = (state: DuelState, owner: string): string[] => {
	return selectState(state, owner, DuelPlace.Deck);
};

export const selectHand = (state: DuelState, owner: string): string[] => {
	return selectState(state, owner, DuelPlace.Hand);
};

export const selectGround = (state: DuelState, owner: string): string[] => {
	return selectState(state, owner, DuelPlace.Ground);
};

export const selectGrave = (state: DuelState, owner: string): string[] => {
	return selectState(state, owner, DuelPlace.Grave);
};

export const pickUniqueIds = (list: string[], amount: number): string[] => {
	const result = [];
	const listClone = [...list];

	for (let i = 0; i < amount; i++) {
		const index = Math.floor(Math.random() * listClone.length);
		const id = listClone.splice(index, 1)[0];
		result.push(id);
	}

	return result;
};

export const getEnemyId = (duel: DuelState, playerId: string) => {
	if (playerId === duel.firstPlayer.id) {
		return duel.secondPlayer.id;
	}

	return duel.firstPlayer.id;
};

export const emptyPassive: Attribute = {
	attack: 0,
	defense: 0,
	health: 0,
};
