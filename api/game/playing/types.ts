export interface GameEvent {
	jwt: string;
	type: EventType;
	payload: never;
}

export enum EventType {
	ConnectMatch = 'ConnectMatch',
	SendBundle = 'SendBundle',
	CardHover = 'CardHover',
	GameOver = 'GameOver',
}

export interface JwtPayload {
	userId: string;
	matchId: string;
}

export type ResponseSender = (
	payload: Record<string, unknown>,
	command?: EventType,
) => Promise<void>;

export interface CommandContext {
	userId: string;
	matchId: string;
	command: EventType;
	send: ResponseSender;
}

export type CommandHandler<T = never> = (
	context: CommandContext,
	payload: T,
) => Promise<void>;

export interface CommandResponse<T = Record<string, unknown>> {
	command: EventType;
	isMyCommand: boolean;
	timestamp: number;
	payload?: T;
}
