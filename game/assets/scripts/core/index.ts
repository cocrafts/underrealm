import type { ComponentType } from './components';
import { ECS } from './ecs';
import { activation, resetAllSkillActivatingSystem, skill } from './systems';
import { duel } from './templates';

export const core = ECS.fromJSON<ComponentType>(duel.entities);

export const system = {
	playerId: 'me',
};

/**
 * There are two approaches of registering system:
 * 1. all entities and queries will be called in all systems
 * 2. attaching systems by queries, will loop over entities first then picking the systems
 * -> register queries for systems and then using operation to merge them (and/or)
 */
core
	/**
	 * Activation systems. The system will check pre-conditions
	 * of entities' activations to enable SkillActivating
	 */
	.addSystem(activation.summon())
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
