import type { ComponentMap, InferComponent } from '../components';

import { createProxy } from './proxy';

export type Key = string | number;

export interface Component<T extends Key> {
	type: T;
}

export interface Entity<CT extends Key> {
	id: number;
	components: Record<string, Component<CT>>;
	addComponent(component: Component<CT>): Entity<CT>;
	removeComponent(type: CT): Entity<CT>;
}

export interface System<CT extends Key> {
	update(entities: Entity<CT>[]): void;
}

export interface Handler<CT extends Key> {
	handle(entities: Entity<CT>[]): void;
}

export class ECS<
	CT extends Key = string, // Component type
	ET extends Key = string, // Event type
> {
	public entities: Entity<CT>[] = [];
	private systems: System<CT>[] = [];
	private eventHandlers: Record<string, Handler<CT>> = {};
	private nextEntityId = 0;

	/**
	 * `useProxy` determines the entity object is subscribable or not by using valtio
	 */
	createEntity(useProxy: boolean = false): Readonly<Entity<CT>> {
		const entityId = this.nextEntityId++;

		const entity: Entity<CT> = {
			id: entityId,
			components: {},
			addComponent: (component) => {
				this.addComponent(entityId, component);
				return entity;
			},
			removeComponent: (type) => {
				this.removeComponent(entityId, type);
				return entity;
			},
		};

		if (useProxy) {
			this.entities.push(createProxy(entity));
		} else {
			this.entities.push(entity);
		}

		return entity;
	}

	getComponent<T extends Component<CT>>(entityId: number, type: CT) {
		return this.entities[entityId].components[type.toString()] as T;
	}

	addComponent(entityId: number, component: Component<CT>): this {
		this.entities[entityId].components[component.type.toString()] = component;
		return this;
	}

	removeComponent(entityId: number, type: CT): this {
		delete this.entities[entityId].components[type.toString()];
		return this;
	}

	query = <T extends keyof ComponentMap>(
		type?: T,
		filter?: Partial<Omit<InferComponent<T>, 'type'>>,
		pairs = [],
	) => {
		if (type) pairs.push({ type, filter });

		return {
			exec: (): Entity<CT>[] => {
				return this.entities.filter((e) => {
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
			and: <T extends keyof ComponentMap>(
				type: T,
				filter?: Partial<Omit<InferComponent<T>, 'type'>>,
			) => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				pairs.push({ type, filter });
				return this.query(null, null, pairs);
			},
		};
	};

	/**
	 * Add system to ECS, the execution priority will bases on adding order
	 */
	addSystem(system: System<CT>): this {
		this.systems.push(system);
		return this;
	}

	addHandler(event: ET, handler: Handler<CT>): this {
		this.eventHandlers[event.toString()] = handler;
		return this;
	}

	handle(event: ET) {
		const handler = this.eventHandlers[event.toString()];
		if (!handler) return;

		handler.handle(this.entities);
		this.update();
	}

	update(): void {
		for (const system of this.systems) {
			system.update(this.entities);
		}
	}

	toJSON() {
		return {
			entities: JSON.parse(JSON.stringify(this.entities)),
		};
	}

	static fromJSON<
		CT extends Key = string, // Component type
		ET extends Key = string, // Event type
	>(entities: Entity<CT>[], useProxy: boolean = false): ECS<CT, ET> {
		const ecs = new ECS<CT, ET>();
		ecs.entities = entities.map((entity) => {
			if (useProxy) return createProxy(entity);
			else return entity;
		});

		return ecs;
	}
}
