import type { Entity } from '../ecs';

import type {
	Attribute,
	Chargeable,
	Classification,
	Metadata,
	Ownership,
	Place,
} from './card';
import type {
	BuffAgainstSameEnemy,
	BuffNextTurn,
	ChargeActivation,
	DestroyFacingMinHealth,
	DoubleAttack,
	FactorCleaver,
	FightActivation,
	FixedCleaver,
	GainAttackByEnemyDefense,
	GainAttackByEnemyMissingHealth,
	GainAttackByRemainingHealth,
	GloryActivation,
	IgnoreEnemyDefense,
	InspireActivation,
	MultiplyDamageAgainst,
	MutateEnemy,
	MutatePlayer,
	MutateRandomEnemy,
	PassiveActivation,
	PreFightActivation,
	SelfBuff,
	SkillActivating,
	SummonActivation,
	Transform,
} from './skills';
import type { ComponentType } from './types';

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
};

export type InferComponent<T extends keyof ComponentMap> = ComponentMap[T];

export const createComponent = <T extends keyof ComponentMap>(
	type: T,
	value: Omit<InferComponent<T>, 'type'>,
): InferComponent<T> => {
	return { ...value, type } as InferComponent<T>;
};

export const getComponent = <T extends keyof ComponentMap>(
	entity: Entity<ComponentType>,
	type: T,
): InferComponent<T> => {
	if (!entity.components[type]) {
		throw Error(
			`component '${type} does not exist in entity '${entity.id}'. Make sure to query correctly before get component`,
		);
	}

	return entity.components[type] as InferComponent<T>;
};

export * from './card';
export * from './skills';
export * from './types';
