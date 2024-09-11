import type { DuelCommandBundle, DuelConfig } from '@underrealm/murg';

export enum DuelCommands {
	ConnectMatch = 'ConnectMatch',
	SendBundle = 'SendBundle',
	CardHover = 'CardHover',
	GameOver = 'GameOver',
}

export interface JwtPayload {
	userId: string;
	duelId: string;
}

export interface CommandPayload {
	jwt: string;
	client: string;
	command: DuelCommands;
	context?: JwtPayload;
	send?: (payload: Record<string, never>) => Promise<void>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload?: any;
}

export interface CommandResponse {
	isMyCommand?: boolean;
	command: DuelCommands;
	payload: never;
}

export interface ServerState {
	jwt?: string;
	context?: JwtPayload;
	config?: DuelConfig;
	history?: DuelCommandBundle[];
}

export interface PlayerIds {
	me: string;
	enemy: string;
}

export interface CardDuel {
	id: string;
	config: DuelConfig;
	history: DuelCommandBundle[];
}
