import type { DuelCommandBundle, DuelConfig } from '@underrealm/murg';

export enum GameEventType {
	ConnectMatch = 'ConnectMatch',
	SendBundle = 'SendBundle',
	CardHover = 'CardHover',
	GameOver = 'GameOver',
}

export interface JwtPayload {
	userId: string;
	matchId: string;
}

export interface CommandPayload {
	action: 'game';
	jwt: string;
	type: GameEventType;
	context?: JwtPayload;
	send?: (payload: Record<string, never>) => Promise<void>;
	payload?: unknown;
}

export interface CommandResponse {
	userId: string;
	type: GameEventType;
	payload: never;
}

export interface PlayerIds {
	me: string;
	enemy: string;
}

export interface GameDuel {
	id: string;
	config: DuelConfig;
	history: DuelCommandBundle[];
}
