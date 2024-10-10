import { ComponentType as CT } from '../components';
import type { ECS } from '../ecs';

export const resetAllSkillActivatingSystem = () => {
	const update = (ecs: ECS) => {
		ecs
			.query(CT.SkillActivating)
			.exec()
			.forEach((entity) => entity.removeComponent(CT.SkillActivating));
	};

	return { update };
};
