/* eslint-disable @typescript-eslint/no-unused-vars */

import { ComponentType as CT } from '../../components';
import { getComponent } from '../../components';
import type { ECS } from '../../ecs';

const destroyFacingMinHealth = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.DestroyFacingMinHealth)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.DestroyFacingMinHealth);
			// do something
		});
	};

	return { update };
};

const gainAttackByEnemyDefense = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.GainAttackByEnemyDefense)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.GainAttackByEnemyDefense);
			// do something
		});
	};

	return { update };
};

const gainAttackByEnemyMissingHealth = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.GainAttackByEnemyMissingHealth)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.GainAttackByEnemyMissingHealth);
			// do something
		});
	};

	return { update };
};

const gainAttackByRemainingHealth = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.GainAttackByRemainingHealth)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.GainAttackByRemainingHealth);
			// do something
		});
	};

	return { update };
};

const mutateEnemy = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.MutateEnemy).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.MutateEnemy);
			// do something
		});
	};

	return { update };
};

const mutateRandomEnemy = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.MutateRandomEnemy)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.MutateRandomEnemy);
			// do something
		});
	};

	return { update };
};

const mutatePlayer = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.MutatePlayer).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.MutatePlayer);
			// do something
		});
	};

	return { update };
};

const ignoreEnemyDefense = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.IgnoreEnemyDefense)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.IgnoreEnemyDefense);
			// do something
		});
	};

	return { update };
};

const selfBuff = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.SelfBuff).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.SelfBuff);
			// do something
		});
	};

	return { update };
};

const buffAgainstSameEnemy = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.BuffAgainstSameEnemy)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.BuffAgainstSameEnemy);
			// do something
		});
	};

	return { update };
};

const buffNextTurn = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.BuffNextTurn).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.BuffNextTurn);
			// do something
		});
	};

	return { update };
};

const fixedCleaver = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.FixedCleaver).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.FixedCleaver);
			// do something
		});
	};

	return { update };
};

const factorCleaver = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.FactorCleaver).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.FactorCleaver);
			// do something
		});
	};

	return { update };
};

const multiplyDamageAgainst = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs
			.query(CT.SkillActivating)
			.and(CT.MultiplyDamageAgainst)
			.exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.MultiplyDamageAgainst);
			// do something
		});
	};

	return { update };
};

const doubleAttack = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.DoubleAttack).exec();

		entities.forEach((entity) => {
			const skill = getComponent(entity, CT.DoubleAttack);
			// do something
		});
	};

	return { update };
};

const transform = () => {
	const update = (ecs: ECS<CT>) => {
		const entities = ecs.query(CT.SkillActivating).and(CT.Transform).exec();

		entities.forEach((entity) => {
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
