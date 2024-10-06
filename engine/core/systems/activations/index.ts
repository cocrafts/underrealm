import {
	ComponentType as CT,
	createComponent,
	getComponent,
} from '../../components';
import type { Entity } from '../../ecs';
import { queryByComponentTypes } from '../../queries';

const createSkillActivating = () => createComponent(CT.SkillActivating, {});

const summon = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.SummonActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
	};

	return { update };
};

const passive = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.PassiveActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
	};

	return { update };
};

const fight = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.FightActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
	};

	return { update };
};

const preFight = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.PreFightActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
	};

	return { update };
};

/**
 * Enable SkillActivating by checking charge vs threshold
 */
const charge = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.ChargeActivation).forEach((entity) => {
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
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.InspireActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
	};

	return { update };
};

const glory = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.GloryActivation).forEach((entity) =>
			entity.addComponent(createSkillActivating()),
		);
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
