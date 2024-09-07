import type { PassiveIds, PassiveRunner } from '../utils/type';

import { damageMultiplier } from './damageMultiplier';
import { gainAttackByEnemyDefense } from './gainAttackByEnemyDefense';
import { gainAttackByEnemyMissingHealth } from './gainAttackByEnemyMissingHealth';
import { gainAttackByRemainingHealth } from './gainAttackByRemainingHealth';
import { gainDefenseByEnemyMissingHealth } from './gainDefenseByMissingHealth';
import { ignoreEnemyDefense } from './ignoreEnemyDefense';
import { mutateByClass } from './mutateByClass';

export const passiveMap: Record<PassiveIds, PassiveRunner> = {
	GainAttackByEnemyDefense: gainAttackByEnemyDefense,
	IgnoreEnemyDefense: ignoreEnemyDefense,
	GainAttackByEnemyMissingHealth: gainAttackByEnemyMissingHealth,
	GainAttackByRemainingHealth: gainAttackByRemainingHealth,
	DamageMultiplier: damageMultiplier,
	GainDefenseByMissingHealth: gainDefenseByEnemyMissingHealth,
	MutateByClass: mutateByClass,
};
