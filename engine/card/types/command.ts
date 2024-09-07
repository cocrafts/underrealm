import type { DuelPlace, DuelState } from './duel';
import type { CommandAttributes } from './internal';

export enum CommandType {
	CardSummon /* <- create from nowhere */,
	CardMove,
	CardMutate,
	CardDust,
	PlayerMutate,
	DuelMutate,
}

export enum SummonSide {
	Left,
	Right,
}

export interface DuelIdentifier {
	id?: string;
	owner?: string;
	position?: number;
	place: DuelPlace;
}

export interface DuelCommand {
	owner?: string;
	type: CommandType;
	from?: DuelIdentifier;
	target?: DuelIdentifier;
	side?: SummonSide;
	payload?: CommandAttributes;
}

export type CreateCommandPayload = Omit<DuelCommand, 'type'> & {
	snapshot: DuelState;
};

export type CommandCreator<T = CreateCommandPayload> = (
	payload: T,
) => DuelCommand[];

export interface RunCommandPayload {
	snapshot: DuelState;
	command: DuelCommand;
}

export type CommandRunner<T = RunCommandPayload> = (payload: T) => DuelState;
