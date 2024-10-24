import { CardPlace, CardType, ClassType, ComponentType } from '../components';
import { activation, resetAllSkillActivatingSystem, skill } from '../systems';

import { ecs } from './v1';

/**
 * There are two approaches of registering system:
 * 1. all entities and queries will be called in all systems
 * 2. attaching systems by queries, will loop over entities first then picking the systems
 * -> register queries for systems and then using operation to merge them (and/or)
 */
ecs
	/**
	 * Activation systems. The system will check pre-conditions
	 * of entities' activations to enable SkillActivating
	 */
	.addSystem(activation.passive())
	.addSystem(activation.fight())
	.addSystem(activation.preFight())
	.addSystem(activation.charge())
	.addSystem(activation.inspire())
	.addSystem(activation.glory())

	/**
	 * Skill systems. The system will filter entities by SkillActivation
	 * and their skill component to handle skill effects.
	 */
	.addSystem(skill.destroyFacingMinHealth())
	.addSystem(skill.gainAttackByEnemyDefense())
	.addSystem(skill.gainAttackByEnemyMissingHealth())
	.addSystem(skill.gainAttackByRemainingHealth())
	.addSystem(skill.mutateEnemy())
	.addSystem(skill.mutateRandomEnemy())
	.addSystem(skill.mutatePlayer())
	.addSystem(skill.ignoreEnemyDefense())
	.addSystem(skill.selfBuff())
	.addSystem(skill.buffAgainstSameEnemy())
	.addSystem(skill.buffNextTurn())
	.addSystem(skill.fixedCleaver())
	.addSystem(skill.factorCleaver())
	.addSystem(skill.multiplyDamageAgainst())
	.addSystem(skill.doubleAttack())
	.addSystem(skill.transform())

	.addSystem(resetAllSkillActivatingSystem());

ecs
	.createEntity()
	.addComponent(ComponentType.Ownership, { owner: 'me' })
	.addComponent(ComponentType.PlayerAttribute, { id: 'A', health: 149 });

ecs
	.createEntity()
	.addComponent(ComponentType.Ownership, { owner: 'enemy' })
	.addComponent(ComponentType.PlayerAttribute, { id: 'B', health: 149 });

ecs
	.createEntity()
	.addComponent(ComponentType.Ownership, { owner: 'enemy' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Hand, index: 0 })
	.addComponent(ComponentType.CardMetadata, {
		id: '999990000',
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
	.addComponent(ComponentType.Ownership, { owner: 'me' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Hand, index: 0 })
	.addComponent(ComponentType.CardMetadata, {
		id: '999990000',
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
	.addComponent(ComponentType.Ownership, { owner: 'me' })
	.addComponent(ComponentType.CardPlace, { place: CardPlace.Hand, index: 1 })
	.addComponent(ComponentType.CardMetadata, {
		id: '999990000',
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

export * from './duel';
export const ecsv1 = ecs.toJSON();
