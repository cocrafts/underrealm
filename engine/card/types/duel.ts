import type { Card, CardState } from './card';
import type {
	GameAttributes,
	Identified,
	PlayerAttributes,
	UnitAttributes,
} from './internal';

export enum DuelPlace {
	Deck,
	Hand,
	Ground,
	Grave,
	Ability,
	Player,
}

export interface DuelSetting {
	handSize: number;
	groundSize: number;
	maxAttachment: number;
	perTurnHero: number;
	perTurnTroop: number;
}

export interface DuelSetup {
	version?: string;
	setting: DuelSetting;
	firstMover?: string;
	player?: [string, string];
	deck?: [string[], string[]];
}

export type PlayerState = Identified & UnitAttributes & PlayerAttributes;
export type PlayerStatePair = [PlayerState, PlayerState];
export type CardStatePair = [CardState[], CardState[]];

export type GameSate = GameAttributes;

export type DuelState = Omit<DuelSetup, 'deck' | 'player'> & {
	cardMap: Record<string, Card>;
	game: GameSate;
	player: PlayerStatePair;
	deck: CardStatePair;
	hand: CardStatePair;
	ground: CardStatePair;
	grave: CardStatePair;
};
