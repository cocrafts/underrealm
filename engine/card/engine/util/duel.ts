import type {
	Card,
	CardState,
	CardStatePair,
	DuelSetup,
	DuelState,
	GameMeta,
	GameSate,
	PlayerState,
} from '../../types';
import { DuelPlace } from '../../types';

const initialHealth = 2500;

export const getInitialSnapshot = (
	{ version, map }: GameMeta,
	{ setting, player, firstMover, deck }: DuelSetup,
): DuelState => {
	const { groundSize, perTurnHero, perTurnTroop } = setting;
	const game: GameSate = { turn: 1 };
	const [A, B] = player;
	const firstPlayer: PlayerState = {
		id: A,
		health: initialHealth,
		perTurnHero,
		perTurnTroop,
	};
	const secondPlayer: PlayerState = {
		id: B,
		health: initialHealth,
		perTurnHero,
		perTurnTroop,
	};
	const [firstIdentifiers, secondIdentifiers] = deck;
	const idToCard = (id: string) => cardStateFromId(map, id);
	const firstDeck: CardState[] = firstIdentifiers.map(idToCard);
	const secondDeck: CardState[] = secondIdentifiers.map(idToCard);
	const ground: CardStatePair = [[], []];

	for (let i = 0; i < groundSize; i += 1) {
		ground[0].push(null);
		ground[1].push(null);
	}

	return {
		version,
		setting,
		game,
		firstMover,
		cardMap: map,
		player: [firstPlayer, secondPlayer],
		deck: [firstDeck, secondDeck],
		hand: [[], []],
		ground,
		grave: [[], []],
	};
};

const cardStateFromId = (
	cardMap: Record<string, Card>,
	id: string,
): CardState => {
	const base: Card = cardMap[id];
	const { attack, defense, health, cooldown } = base;

	return {
		id,
		base,
		attack,
		defense,
		health,
		cooldown,
	};
};

type CloneDuelResult<T> = {
	key: string;
	source: T;
};

export const cloneDuelSource = <T = CardStatePair>(
	snapshot: DuelState,
	place: DuelPlace,
): CloneDuelResult<T> => {
	const key = placeMap[place];
	const source = snapshot[key] as T;

	return { key, source };
};

const placeMap = {
	[DuelPlace.Deck]: 'deck',
	[DuelPlace.Hand]: 'hand',
	[DuelPlace.Ground]: 'ground',
	[DuelPlace.Grave]: 'grave',
	[DuelPlace.Player]: 'player',
};
