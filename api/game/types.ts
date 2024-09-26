import type { DuelCommandBundle, DuelConfig } from '@underrealm/murg';
// import type { GameInvitation } from './graphql';
import type { DynamoRecord } from 'utils/types';

// export type GameInvitationRecord = DynamoRecord & GameInvitation;
export type GameInvitationRecord = DynamoRecord;

export type CardDuelRecord = DynamoRecord & {
	winner?: string;
	config: DuelConfig;
	history: DuelCommandBundle[];
};

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

export interface CommandPayload<T = never> {
	jwt: string;
	client: string;
	command: DuelCommands;
	payload: T;
}

export type ResponseSender = (
	payload: Record<string, unknown>,
	command?: DuelCommands,
) => Promise<void>;

export interface CommandContext {
	domainName?: string;
	connectionId?: string;
	userId: string;
	duelId: string;
	command: DuelCommands;
	send: ResponseSender;
}

export type CommandHandler<T = never> = (
	context: CommandContext,
	payload: T,
) => Promise<void>;

export interface CommandResponse<T = Record<string, unknown>> {
	command: DuelCommands;
	isMyCommand: boolean;
	timestamp: number;
	payload?: T;
}

export type MatchFindRecord = DynamoRecord & {
	version: string;
	playerId: string;
	playerMmr: number;
	timestamp: string;
};
