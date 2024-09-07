import type { CommandCreator, DuelIdentifier } from './command';
import type { DuelState } from './duel';
import type { AbilityAttributes, HookType } from './internal';

export enum AbilityType {
	Cooldown,
	Hook,
	Spell,
	Attachment,
	Trait,
}

export enum AbilityTargeting {
	Player,
	Selected,
	Self,
	Front,
	Allies,
	LeftAlly,
	LeftAllies,
	RightAlly,
	RightAllies,
	LowestHealth,
	HighestHealth,
}

export enum AbilityRange {
	Target,
	Front,
	Area,
	Linear,
	LeftLinear,
	RightLinear,
}

export interface AbilityConfig {
	id: string;
	type: AbilityType;
	attributes: AbilityAttributes;
	hook?: HookType;
	targeting?: AbilityTargeting;
	instruction?: string;
	iconUri?: string;
}

export interface AbilityRunnerPayload {
	snapshot: DuelState;
	ability: AbilityConfig;
	from?: DuelIdentifier;
	target?: DuelIdentifier;
}

export type AbilityRunner = CommandCreator<AbilityRunnerPayload>;
