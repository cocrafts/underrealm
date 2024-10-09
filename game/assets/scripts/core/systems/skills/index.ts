/* eslint-disable @typescript-eslint/no-unused-vars */

import { ComponentType as CT, getComponent } from '../../components';
import type { Entity } from '../../ecs';
import { queryByComponentTypes } from '../../queries';

const skillQuery = (entities: Entity<CT>[], type: CT) => {
	return queryByComponentTypes(entities, CT.SkillActivating, type);
};

const destroyFacingMinHealth = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.DestroyFacingMinHealth).forEach((entity) => {
			const skill = getComponent(entity, CT.DestroyFacingMinHealth);
			// do something
		});
	};

	return { update };
};

const gainAttackByEnemyDefense = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.GainAttackByEnemyDefense).forEach((entity) => {
			const skill = getComponent(entity, CT.GainAttackByEnemyDefense);
			// do something
		});
	};

	return { update };
};

const gainAttackByEnemyMissingHealth = () => ({
	update: (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.GainAttackByEnemyMissingHealth).forEach(
			(entity) => {
				const skill = getComponent(entity, CT.GainAttackByEnemyMissingHealth);
				// do something
			},
		);
	},
});

const gainAttackByRemainingHealth = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.GainAttackByRemainingHealth).forEach((entity) => {
			const skill = getComponent(entity, CT.GainAttackByRemainingHealth);
			// do something
		});
	};

	return { update };
};

const mutateEnemy = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.MutateEnemy).forEach((entity) => {
			const skill = getComponent(entity, CT.MutateEnemy);
			// do something
		});
	};

	return { update };
};

const mutateRandomEnemy = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.MutateRandomEnemy).forEach((entity) => {
			const skill = getComponent(entity, CT.MutateRandomEnemy);
			// do something
		});
	};

	return { update };
};

const mutatePlayer = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.MutatePlayer).forEach((entity) => {
			const skill = getComponent(entity, CT.MutatePlayer);
			// do something
		});
	};

	return { update };
};

const ignoreEnemyDefense = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.IgnoreEnemyDefense).forEach((entity) => {
			const skill = getComponent(entity, CT.IgnoreEnemyDefense);
			// do something
		});
	};

	return { update };
};

const selfBuff = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.SelfBuff).forEach((entity) => {
			const skill = getComponent(entity, CT.SelfBuff);
			// do something
		});
	};

	return { update };
};

const buffAgainstSameEnemy = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.BuffAgainstSameEnemy).forEach((entity) => {
			const skill = getComponent(entity, CT.BuffAgainstSameEnemy);
			// do something
		});
	};

	return { update };
};

const buffNextTurn = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.BuffNextTurn).forEach((entity) => {
			const skill = getComponent(entity, CT.BuffNextTurn);
			// do something
		});
	};

	return { update };
};

const fixedCleaver = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.FixedCleaver).forEach((entity) => {
			const skill = getComponent(entity, CT.FixedCleaver);
			// do something
		});
	};

	return { update };
};

const factorCleaver = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.FactorCleaver).forEach((entity) => {
			const skill = getComponent(entity, CT.FactorCleaver);
			// do something
		});
	};

	return { update };
};

const multiplyDamageAgainst = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.MultiplyDamageAgainst).forEach((entity) => {
			const skill = getComponent(entity, CT.MultiplyDamageAgainst);
			// do something
		});
	};

	return { update };
};
const doubleAttack = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.DoubleAttack).forEach((entity) => {
			const skill = getComponent(entity, CT.DoubleAttack);
			// do something
		});
	};

	return { update };
};

const transform = () => {
	const update = (entities: Entity<CT>[]) => {
		skillQuery(entities, CT.Transform).forEach((entity) => {
			const skill = getComponent(entity, CT.Transform);
			// do something
		});
	};

	return { update };
};

export const skill = {
	destroyFacingMinHealth,
	gainAttackByEnemyDefense,
	gainAttackByEnemyMissingHealth,
	gainAttackByRemainingHealth,
	mutateEnemy,
	mutateRandomEnemy,
	mutatePlayer,
	ignoreEnemyDefense,
	selfBuff,
	buffAgainstSameEnemy,
	buffNextTurn,
	fixedCleaver,
	factorCleaver,
	multiplyDamageAgainst,
	doubleAttack,
	transform,
};
