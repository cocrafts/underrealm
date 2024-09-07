export interface Identified {
	id: string;
}

export interface UnitAttributes {
	attack?: number;
	defense?: number;
	health?: number;
	cooldown?: number;
}

export interface PlayerAttributes {
	perTurnHero?: number;
	perTurnTroop?: number;
}

export interface GameAttributes {
	turn?: number;
}

export type CommandAttributes = UnitAttributes &
	PlayerAttributes &
	GameAttributes;

export type AbilityAttributes = Record<string, number>;

export enum HookType {
	TurnBegin,
	TurnEnd,
	SkillActivated,
	SpellActivated,
	Death,
	AllyDeath,
	EnemyDeath,
	Summon,
	AllySummon,
	EnemySummon,
}
