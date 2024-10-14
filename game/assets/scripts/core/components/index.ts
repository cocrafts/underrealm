import type { Component } from '../ecs';

import type {
	CardPlace,
	CardType,
	ClassType,
	ComponentType,
	DuelPhase,
	InspireSource,
} from './types';

export * from './types';

/**
 * Remap type to object for supporting strict type checking
 */
export type ComponentMap = {
	[ComponentType.Metadata]: Metadata;
	[ComponentType.Attribute]: Attribute;
	[ComponentType.Classification]: Classification;
	[ComponentType.Chargeable]: Chargeable;
	[ComponentType.Ownership]: Ownership;
	[ComponentType.Place]: Place;

	[ComponentType.SummonActivation]: SummonActivation;
	[ComponentType.PassiveActivation]: PassiveActivation;
	[ComponentType.FightActivation]: FightActivation;
	[ComponentType.PreFightActivation]: PreFightActivation;
	[ComponentType.ChargeActivation]: ChargeActivation;
	[ComponentType.InspireActivation]: InspireActivation;
	[ComponentType.GloryActivation]: GloryActivation;
	[ComponentType.SkillActivating]: SkillActivating;

	[ComponentType.DestroyFacingMinHealth]: DestroyFacingMinHealth;
	[ComponentType.GainAttackByEnemyDefense]: GainAttackByEnemyDefense;
	[ComponentType.GainAttackByEnemyMissingHealth]: GainAttackByEnemyMissingHealth;
	[ComponentType.GainAttackByRemainingHealth]: GainAttackByRemainingHealth;
	[ComponentType.MutateEnemy]: MutateEnemy;
	[ComponentType.MutateRandomEnemy]: MutateRandomEnemy;
	[ComponentType.MutatePlayer]: MutatePlayer;
	[ComponentType.IgnoreEnemyDefense]: IgnoreEnemyDefense;
	[ComponentType.SelfBuff]: SelfBuff;
	[ComponentType.BuffAgainstSameEnemy]: BuffAgainstSameEnemy;
	[ComponentType.BuffNextTurn]: BuffNextTurn;
	[ComponentType.FixedCleaver]: FixedCleaver;
	[ComponentType.FactorCleaver]: FactorCleaver;
	[ComponentType.MultiplyDamageAgainst]: MultiplyDamageAgainst;
	[ComponentType.DoubleAttack]: DoubleAttack;
	[ComponentType.Transform]: Transform;

	[ComponentType.Player]: Player;

	[ComponentType.DuelManager]: DuelManager;

	[ComponentType.Config]: Config;
};

/**
 * Card components
 */
export type Metadata = Component<ComponentType.Metadata> & {
	id: string;
	name: string;
	class: ClassType;
	kind: CardType;
	rarity: 0;
};

export type Classification = Component<ComponentType.Classification> & {
	kind: CardType;
	class: ClassType;
};

export type Attribute = Component<ComponentType.Attribute> & {
	attack: number;
	health: number;
	defense: number;
};

export type Place = Component<ComponentType.Place> & {
	index: number;
	place: CardPlace;
};

export type Ownership = Component<ComponentType.Ownership> & {
	owner: string;
};

export type Chargeable = Component<ComponentType.Chargeable> & {
	charge: number;
};

/**
 * Skill components
 */
export type SummonActivation = Component<ComponentType.SummonActivation>;

export type PassiveActivation = Component<ComponentType.PassiveActivation>;

export type FightActivation = Component<ComponentType.FightActivation>;

export type PreFightActivation = Component<ComponentType.PreFightActivation>;

export type ChargeActivation = Component<ComponentType.ChargeActivation> & {
	current: number;
	threshold: number;
};

export type InspireActivation = Component<ComponentType.InspireActivation> & {
	source: InspireSource;
};

export type GloryActivation = Component<ComponentType.GloryActivation>;

export type SkillActivating = Component<ComponentType.SkillActivating>;

export type DestroyFacingMinHealth =
	Component<ComponentType.DestroyFacingMinHealth> & {
		minHealth: number;
		cardTypes: CardType[];
	};

export type GainAttackByEnemyDefense =
	Component<ComponentType.GainAttackByEnemyDefense>;

export type GainAttackByEnemyMissingHealth =
	Component<ComponentType.GainAttackByEnemyMissingHealth>;

export type GainAttackByRemainingHealth =
	Component<ComponentType.GainAttackByRemainingHealth>;

export type MutateEnemy = Component<ComponentType.MutateEnemy> & {
	health: number;
	defense: number;
	attack: number;
};

export type MutateRandomEnemy = Component<ComponentType.MutateRandomEnemy> & {
	health: number;
	defense: number;
	attack: number;
};

export type MutatePlayer = Component<ComponentType.MutatePlayer> & {
	health: number;
};

export type IgnoreEnemyDefense = Component<ComponentType.IgnoreEnemyDefense> & {
	defense?: number;
};

export type SelfBuff = Component<ComponentType.SelfBuff> & {
	life: number;
	health: number;
	defense: number;
	attack: number;
};

export type BuffAgainstSameEnemy =
	Component<ComponentType.BuffAgainstSameEnemy> & {
		firstEnemyId: string;
		health: number;
		defense: number;
		attack: number;
	};

export type BuffNextTurn = Component<ComponentType.BuffNextTurn> & {
	turn: number;
	health: number;
	defense: number;
	attack: number;
};

export type FixedCleaver = Component<ComponentType.FixedCleaver> & {
	life: number;
	radius: number;
	damage: number;
};

export type FactorCleaver = Component<ComponentType.FactorCleaver> & {
	damageFactor: number;
};

export type MultiplyDamageAgainst =
	Component<ComponentType.MultiplyDamageAgainst> & {
		factor: number;
		cardTypes: CardType[];
	};

export type DoubleAttack = Component<ComponentType.DoubleAttack>;

export type Transform = Component<ComponentType.Transform>;

/**
 * Player components
 */
export type Player = Component<ComponentType.Player> & {
	id: string;
	health: number;
};

/**
 * Duel components
 */
export type DuelManager = Component<ComponentType.DuelManager> & {
	phase: DuelPhase;
	turnOf: string;
};

/**
 * Config components
 */
export type Config = Component<ComponentType.Config> & {
	initialCardCount: number;
	initialPlayerHealth: number;
	elementalFactor: number;
	handSize: number;
	groundSize: number;
	maxDeckSize: number;
	maxAttachment: number;
	spellIncreaseCycle: number;
	perTurnDraw: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
};
