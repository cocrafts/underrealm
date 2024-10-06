import type { Component } from '../ecs';

import type { CardType } from './card';
import type { ComponentType, InspireSource } from './types';

export type SummonActivation = Component<ComponentType.SummonActivation>;

export type PassiveActivation = Component<ComponentType.PassiveActivation>;

export type FightActivation = Component<ComponentType.FightActivation>;

export type PreFightActivation = Component<ComponentType.PreFightActivation>;

export type ChargeActivation = Component<ComponentType.ChargeActivation> & {
	threshold: number;
	charge: number;
};

export type InspireActivation = Component<ComponentType.InspireActivation> & {
	source: InspireSource;
};

export type GloryActivation = Component<ComponentType.GloryActivation>;

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
