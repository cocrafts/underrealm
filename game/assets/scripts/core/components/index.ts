import type { Component } from '../ecs';

import type {
	CardPlace as CardPlaceType,
	CardType,
	ClassType,
	ComponentType,
	InspireSource,
} from './types';

export * from './types';

/**
 * Remap type to object for supporting strict type checking
 */
export type ComponentMap = {
	[ComponentType.PlayerAttribute]: PlayerAttribute;

	[ComponentType.CardMetadata]: Metadata;
	[ComponentType.CardAttribute]: CardAttribute;
	[ComponentType.CardClass]: CardClass;
	[ComponentType.CardChargeable]: CardChargeable;
	[ComponentType.CardOwnership]: Ownership;
	[ComponentType.CardPlace]: CardPlace;

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
};

/**
 * Player components
 */
type PlayerAttribute = Component<ComponentType.PlayerAttribute> & {
	health: number;
};

/**
 * Card components
 */
type Metadata = Component<ComponentType.CardMetadata> & {
	name: string;
	class: ClassType;
	kind: CardType;
	rarity: 0;
};

type CardClass = Component<ComponentType.CardClass> & {
	kind: CardType;
	class: ClassType;
};

type CardAttribute = Component<ComponentType.CardAttribute> & {
	attack: number;
	health: number;
	defense: number;
};

type CardPlace = Component<ComponentType.CardPlace> & {
	index: number;
	place: CardPlaceType;
};

type Ownership = Component<ComponentType.CardOwnership> & {
	owner: string;
};

type CardChargeable = Component<ComponentType.CardChargeable> & {
	charge: number;
};

/**
 * Skill components
 */
type SummonActivation = Component<ComponentType.SummonActivation>;

type PassiveActivation = Component<ComponentType.PassiveActivation>;

type FightActivation = Component<ComponentType.FightActivation>;

type PreFightActivation = Component<ComponentType.PreFightActivation>;

type ChargeActivation = Component<ComponentType.ChargeActivation> & {
	current: number;
	threshold: number;
};

type InspireActivation = Component<ComponentType.InspireActivation> & {
	source: InspireSource;
};

type GloryActivation = Component<ComponentType.GloryActivation>;

type SkillActivating = Component<ComponentType.SkillActivating>;

type DestroyFacingMinHealth =
	Component<ComponentType.DestroyFacingMinHealth> & {
		minHealth: number;
		cardTypes: CardType[];
	};

type GainAttackByEnemyDefense =
	Component<ComponentType.GainAttackByEnemyDefense>;

type GainAttackByEnemyMissingHealth =
	Component<ComponentType.GainAttackByEnemyMissingHealth>;

type GainAttackByRemainingHealth =
	Component<ComponentType.GainAttackByRemainingHealth>;

type MutateEnemy = Component<ComponentType.MutateEnemy> & {
	health: number;
	defense: number;
	attack: number;
};

type MutateRandomEnemy = Component<ComponentType.MutateRandomEnemy> & {
	health: number;
	defense: number;
	attack: number;
};

type MutatePlayer = Component<ComponentType.MutatePlayer> & {
	health: number;
};

type IgnoreEnemyDefense = Component<ComponentType.IgnoreEnemyDefense> & {
	defense?: number;
};

type SelfBuff = Component<ComponentType.SelfBuff> & {
	life: number;
	health: number;
	defense: number;
	attack: number;
};

type BuffAgainstSameEnemy = Component<ComponentType.BuffAgainstSameEnemy> & {
	firstEnemyId: string;
	health: number;
	defense: number;
	attack: number;
};

type BuffNextTurn = Component<ComponentType.BuffNextTurn> & {
	turn: number;
	health: number;
	defense: number;
	attack: number;
};

type FixedCleaver = Component<ComponentType.FixedCleaver> & {
	life: number;
	radius: number;
	damage: number;
};

type FactorCleaver = Component<ComponentType.FactorCleaver> & {
	damageFactor: number;
};

type MultiplyDamageAgainst = Component<ComponentType.MultiplyDamageAgainst> & {
	factor: number;
	cardTypes: CardType[];
};

type DoubleAttack = Component<ComponentType.DoubleAttack>;

type Transform = Component<ComponentType.Transform>;
