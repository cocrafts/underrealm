import { createComponent } from 'core/components';
import { CardType } from 'core/components/card';
import { ClassType } from 'core/components/card';
import { ComponentType, InspireSource } from 'core/components/types';
import { ECS } from 'core/ecs';

export const ecs = new ECS<ComponentType>();

/**
 * Troop Cards
 */
ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Troop',
			class: ClassType.Knight,
			kind: CardType.Hero,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 0,
			health: 40,
		}),
	);
ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Wolf',
			kind: CardType.Troop,
			class: ClassType.Beast,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 0,
			health: 20,
		}),
	);
ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Snake',
			kind: CardType.Troop,
			class: ClassType.Beast,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 10,
			defense: 0,
			health: 20,
		}),
	);

/**
 * Hero Cards
 */
ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'The Raven',
			kind: CardType.Hero,
			class: ClassType.Assassin,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 30,
		}),
	)
	.addComponent(createComponent(ComponentType.SummonActivation, {}))
	.addComponent(
		createComponent(ComponentType.DestroyFacingMinHealth, {
			minHealth: 9999,
			cardTypes: [CardType.Hero],
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'The Mystic',
			kind: CardType.Hero,
			class: ClassType.Assassin,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 40,
			defense: 0,
			health: 30,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(createComponent(ComponentType.GainAttackByEnemyDefense, {}));

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'The Shield Breaker',
			kind: CardType.Hero,
			class: ClassType.Assassin,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 40,
			defense: 0,
			health: 30,
		}),
	)
	.addComponent(createComponent(ComponentType.FightActivation, {}))
	.addComponent(
		createComponent(ComponentType.MutateEnemy, {
			attack: 0,
			defense: -10,
			health: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'The Stinger',
			kind: CardType.Hero,
			class: ClassType.Assassin,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 60,
			defense: 0,
			health: 20,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(createComponent(ComponentType.IgnoreEnemyDefense, {}));

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Vesu Beast',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(
		createComponent(ComponentType.GainAttackByEnemyMissingHealth, {}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Cavalier',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 5,
			health: 35,
		}),
	)
	.addComponent(createComponent(ComponentType.PreFightActivation, {}))
	.addComponent(
		createComponent(ComponentType.DestroyFacingMinHealth, {
			minHealth: 30,
			cardTypes: [CardType.Hero, CardType.Troop],
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Fire Champion',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 2,
			charge: 2,
		}),
	)
	.addComponent(
		createComponent(ComponentType.SelfBuff, {
			life: 1,
			attack: 20,
			defense: 0,
			health: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.FixedCleaver, {
			life: 1,
			radius: 1,
			damage: 20,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'War Chief',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 0,
			defense: 0,
			health: 60,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(createComponent(ComponentType.GainAttackByRemainingHealth, {}));

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Marcus',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 15,
			defense: 0,
			health: 50,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 1,
			charge: 1,
		}),
	)
	.addComponent(
		createComponent(ComponentType.MutateRandomEnemy, {
			attack: 0,
			health: -40,
			defense: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Nepia',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(
		createComponent(ComponentType.MultiplyDamageAgainst, {
			factor: 2.5,
			cardTypes: [CardType.Hero],
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Knight Captain',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(
		createComponent(ComponentType.InspireActivation, {
			source: InspireSource.Skill,
		}),
	)
	.addComponent(
		createComponent(ComponentType.SelfBuff, {
			attack: 5,
			health: 0,
			defense: 0,
			life: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Brawler',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(
		createComponent(ComponentType.InspireActivation, {
			source: InspireSource.Death,
		}),
	)
	.addComponent(
		createComponent(ComponentType.SelfBuff, {
			attack: 5,
			health: 0,
			defense: 0,
			life: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Legionnaire',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 25,
			defense: 5,
			health: 50,
		}),
	)
	.addComponent(createComponent(ComponentType.GloryActivation, {}))
	.addComponent(createComponent(ComponentType.MutatePlayer, { health: -25 }));

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Head Hunter',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 20,
			defense: 0,
			health: 50,
		}),
	)
	.addComponent(createComponent(ComponentType.FightActivation, {}))
	.addComponent(
		createComponent(ComponentType.BuffAgainstSameEnemy, {
			firstEnemyId: '',
			attack: 10,
			defense: 0,
			health: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'War Hound',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 2,
			charge: 2,
		}),
	)
	.addComponent(createComponent(ComponentType.DoubleAttack, {}));

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Paladin',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 25,
			defense: 0,
			health: 50,
		}),
	)
	.addComponent(createComponent(ComponentType.PassiveActivation, {}))
	.addComponent(
		createComponent(ComponentType.IgnoreEnemyDefense, { defense: 10 }),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Knight of Vesu',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 5,
			health: 55,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Fire Warrior',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 35,
			defense: 0,
			health: 35,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 2,
			charge: 2,
		}),
	)
	.addComponent(
		createComponent(ComponentType.BuffNextTurn, {
			turn: 0,
			attack: 20,
			defense: 0,
			health: 0,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Destroyer',
			kind: CardType.Hero,
			class: ClassType.Knight,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 30,
			defense: 0,
			health: 40,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 2,
			charge: 2,
		}),
	)
	.addComponent(
		createComponent(ComponentType.MutateEnemy, {
			attack: 0,
			defense: 0,
			health: -30,
		}),
	);

ecs
	.createEntity()
	.addComponent(
		createComponent(ComponentType.Metadata, {
			name: 'Infiltrator',
			kind: CardType.Hero,
			class: ClassType.Tanker,
			rarity: 0,
		}),
	)
	.addComponent(
		createComponent(ComponentType.Attribute, {
			attack: 15,
			defense: 5,
			health: 50,
		}),
	)
	.addComponent(
		createComponent(ComponentType.ChargeActivation, {
			threshold: 3,
			charge: 3,
		}),
	)
	.addComponent(createComponent(ComponentType.Transform, {}));
