import {
	ComponentType as CT,
	createComponent,
	getComponent,
} from '../../components';
import type { ECS } from '../../ecs';

const createSkillActivating = () => createComponent(CT.SkillActivating, {});

const summon = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.SummonActivation).exec();

		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

const passive = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.PassiveActivation).exec();

		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

const fight = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.FightActivation).exec();

		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

const preFight = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.PreFightActivation).exec();

		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

/**
 * Enable SkillActivating by checking charge vs threshold
 */
const charge = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.PreFightActivation).exec();

		entities.forEach((entity) => {
			const charge = getComponent(entity, CT.ChargeActivation);
			if (charge.current < charge.threshold) return;

			// reset charge
			charge.current = 0;

			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

const inspire = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.InspireActivation).exec();

		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

const glory = () => {
	const update = (ecs: ECS) => {
		const entities = ecs.query(CT.GloryActivation).exec();
		entities.forEach((entity) => {
			entity.addComponent(createSkillActivating());
		});
	};

	return { update };
};

export const activation = {
	summon,
	passive,
	fight,
	preFight,
	charge,
	inspire,
	glory,
};
