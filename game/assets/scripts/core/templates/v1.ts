import {
	CardType,
	ClassType,
	ComponentType,
	InspireSource,
} from '../components';
import { ECS } from '../ecs';

export const ecs = new ECS();

/**
 * Troop Cards
 */
ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Troop',
		class: ClassType.Knight,
		kind: CardType.Hero,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 40,
	});
ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Wolf',
		kind: CardType.Troop,
		class: ClassType.Beast,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 20,
	});
ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Snake',
		kind: CardType.Troop,
		class: ClassType.Beast,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 10,
		defense: 0,
		health: 20,
	});

/**
 * Hero Cards
 */
ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'The Raven',
		kind: CardType.Hero,
		class: ClassType.Assassin,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 30,
	})
	.addComponent(ComponentType.SummonActivation, {})
	.addComponent(ComponentType.DestroyFacingMinHealth, {
		minHealth: 9999,
		cardTypes: [CardType.Hero],
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'The Mystic',
		kind: CardType.Hero,
		class: ClassType.Assassin,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 40,
		defense: 0,
		health: 30,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.GainAttackByEnemyDefense, {});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'The Shield Breaker',
		kind: CardType.Hero,
		class: ClassType.Assassin,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 40,
		defense: 0,
		health: 30,
	})
	.addComponent(ComponentType.FightActivation, {})
	.addComponent(ComponentType.MutateEnemy, {
		attack: 0,
		defense: -10,
		health: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'The Stinger',
		kind: CardType.Hero,
		class: ClassType.Assassin,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 60,
		defense: 0,
		health: 20,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.IgnoreEnemyDefense, {});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Vesu Beast',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.GainAttackByEnemyMissingHealth, {});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Cavalier',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 5,
		health: 35,
	})
	.addComponent(ComponentType.PreFightActivation, {})
	.addComponent(ComponentType.DestroyFacingMinHealth, {
		minHealth: 30,
		cardTypes: [CardType.Hero, CardType.Troop],
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Fire Champion',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 2,
		current: 2,
	})
	.addComponent(ComponentType.SelfBuff, {
		life: 1,
		attack: 20,
		defense: 0,
		health: 0,
	})
	.addComponent(ComponentType.FixedCleaver, {
		life: 1,
		radius: 1,
		damage: 20,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'War Chief',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 0,
		defense: 0,
		health: 60,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.GainAttackByRemainingHealth, {});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Marcus',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 15,
		defense: 0,
		health: 50,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 1,
		current: 1,
	})
	.addComponent(ComponentType.MutateRandomEnemy, {
		attack: 0,
		health: -40,
		defense: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Nepia',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.MultiplyDamageAgainst, {
		factor: 2.5,
		cardTypes: [CardType.Hero],
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Knight Captain',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.InspireActivation, {
		source: InspireSource.Skill,
	})
	.addComponent(ComponentType.SelfBuff, {
		attack: 5,
		health: 0,
		defense: 0,
		life: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Brawler',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.InspireActivation, {
		source: InspireSource.Death,
	})
	.addComponent(ComponentType.SelfBuff, {
		attack: 5,
		health: 0,
		defense: 0,
		life: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Legionnaire',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 25,
		defense: 5,
		health: 50,
	})
	.addComponent(ComponentType.GloryActivation, {})
	.addComponent(ComponentType.MutatePlayer, { health: -25 });

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Head Hunter',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 20,
		defense: 0,
		health: 50,
	})
	.addComponent(ComponentType.FightActivation, {})
	.addComponent(ComponentType.BuffAgainstSameEnemy, {
		firstEnemyId: '',
		attack: 10,
		defense: 0,
		health: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'War Hound',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 2,
		current: 2,
	})
	.addComponent(ComponentType.DoubleAttack, {});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Paladin',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 25,
		defense: 0,
		health: 50,
	})
	.addComponent(ComponentType.PassiveActivation, {})
	.addComponent(ComponentType.IgnoreEnemyDefense, { defense: 10 });

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Knight of Vesu',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 5,
		health: 55,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Fire Warrior',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 35,
		defense: 0,
		health: 35,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 2,
		current: 2,
	})
	.addComponent(ComponentType.BuffNextTurn, {
		turn: 0,
		attack: 20,
		defense: 0,
		health: 0,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Destroyer',
		kind: CardType.Hero,
		class: ClassType.Knight,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 30,
		defense: 0,
		health: 40,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 2,
		current: 2,
	})
	.addComponent(ComponentType.MutateEnemy, {
		attack: 0,
		defense: 0,
		health: -30,
	});

ecs
	.createEntity()
	.addComponent(ComponentType.CardMetadata, {
		name: 'Infiltrator',
		kind: CardType.Hero,
		class: ClassType.Tanker,
		rarity: 0,
	})
	.addComponent(ComponentType.CardAttribute, {
		attack: 15,
		defense: 5,
		health: 50,
	})
	.addComponent(ComponentType.ChargeActivation, {
		threshold: 3,
		current: 3,
	})
	.addComponent(ComponentType.Transform, {});
