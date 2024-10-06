/**
 * Implement all query with cache for optimization
 */

import type { ComponentType } from '../components';
import type { Entity } from '../ecs';

export const queryByComponentTypes = (
	entities: Entity<ComponentType>[],
	...types: ComponentType[]
): Entity<ComponentType>[] => {
	return entities.filter((e) =>
		types.every((t) => !!e.components[t.toString()]),
	);
};
