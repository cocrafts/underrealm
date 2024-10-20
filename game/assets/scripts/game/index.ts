import type { ComponentMap as LogicComponentMap } from '../core';
import {
	activation,
	ComponentType as LogicComponentType,
	ECS,
	resetAllSkillActivatingSystem,
	skill,
} from '../core';
import type { EventType } from '../core/events';
import { duel } from '../core/templates';
import { DeckCounter } from '../v2/DeckCounter';
import { PlayerController } from '../v2/PlayerController';

import type { GameComponentMap } from './components';

export * from '../core';
export { GameComponentType, GameComponentType as GCT } from './components';
export { GameComponentMap, LogicComponentType as LCT, LogicComponentType };

export type CM = ComponentMap;
export type ComponentMap = GameComponentMap & LogicComponentMap;
export type GameECS = ECS<ComponentMap, EventType>;

export const core = ECS.fromJSON<ComponentMap, EventType>(duel);

export const system = {
	playerId: 'me',
	enemyId: 'enemy',
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

	.addSystem(DeckCounter.updateDeckCountersSystem())
	.addSystem(PlayerController.updatePlayersAttributeSystem())

	.addSystem(resetAllSkillActivatingSystem());

setTimeout(() => {
	core.update();
}, 1000);
