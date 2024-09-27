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
	routeKey: 'game';
	jwt: string;
	type: GameEventType;
	context?: JwtPayload;
	send?: (payload: Record<string, never>) => Promise<void>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
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

export interface GameMatch {
	id: string;
	config: DuelConfig;
	commandBundles: DuelCommandBundle[];
}
