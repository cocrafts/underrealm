import { ComponentType as CT } from '../components';
import type { Entity } from '../ecs';
import { queryByComponentTypes } from '../queries';

export const resetAllSkillActivatingSystem = () => {
	const update = (entities: Entity<CT>[]) => {
		queryByComponentTypes(entities, CT.SkillActivating).forEach((entity) => {
			delete entity.components[CT.SkillActivating];
		});
	};

	return { update };
};
