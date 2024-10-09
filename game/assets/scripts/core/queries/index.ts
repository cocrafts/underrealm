/**
 * Implement all query with cache for optimization
 * Cache map example:
 * {
 * 		[ComponentType]: {
 * 			[EntityId]: entity
 * 		}
 * }
 */

import type { ComponentMap, ComponentType } from '../components';
import type { Entity } from '../ecs';

export const queryByComponentTypes = (
	entities: Entity<ComponentType>[],
	...types: ComponentType[]
): Entity<ComponentType>[] => {
	return entities.filter((e) =>
		types.every((t) => !!e.components[t.toString()]),
	);
};

type InferComponent<T extends keyof ComponentMap> = ComponentMap[T];

export const queryByComponent = <T extends keyof ComponentMap>(
	entities: Entity<T>[],
	type: T,
	filter: Partial<InferComponent<T>>,
): Entity<T>[] => {
	return entities.filter((e) => {
		return (
			!!e.components[type] &&
			Object.keys(filter).every((k) => e.components[type][k] === filter[k])
		);
	});
};

export const query = (entities: Entity<ComponentType>[], pairs = []) => {
	return {
		exec: (): Entity<ComponentType>[] => {
			return entities.filter((e) => {
				return pairs.every(({ type, filter }) => {
					const hasComponent = e.components[type];
					if (!hasComponent) return false;
					if (!filter) return true;

					const isFilterMatched = Object.keys(filter).every(
						(k) => e.components[type][k] === filter[k],
					);

					return isFilterMatched;
				});
			});
		},
		filter: <T extends keyof ComponentMap>(
			type: T,
			filter?: Partial<Omit<InferComponent<T>, 'type'>>,
		) => {
			return query(entities, [...pairs, { type, filter }]);
		},
	};
};
