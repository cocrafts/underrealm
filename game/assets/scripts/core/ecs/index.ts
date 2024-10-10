import type { ComponentMap, InferComponent } from '../components';

import { createProxy } from './proxy';

export type Key = string | number;

export type QueryFilter<T extends keyof ComponentMap> = Partial<
	Omit<InferComponent<T>, 'type'>
>;

export interface Component<T extends Key> {
	type: T;
}

export interface Entity<CT extends Key> {
	id: number;
	components: Record<string, Component<CT>>;
	addComponent(component: Component<CT>): Entity<CT>;
	removeComponent(type: CT): Entity<CT>;
}

export interface System<CT extends Key, ET extends Key> {
	update(ecs: ECS<CT, ET>): void;
}

export interface Handler<CT extends Key, ET extends Key> {
	handle(ecs: ECS<CT, ET>): void;
}

export class ECS<
	CT extends Key = string, // Component type
	ET extends Key = string, // Event type
> {
	public entities: Entity<CT>[] = [];
	private systems: System<CT, ET>[] = [];
	private eventHandlers: Record<string, Handler<CT, ET>> = {};
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
		filter?: QueryFilter<T>,
		pairs = [],
	) => {
		if (type) pairs.push({ type, filter });

		const checkFilters = (entity: Entity<CT>) => {
			return pairs.every(({ type, filter }) => {
				const component = entity.components[type];
				if (!component) return false;
				if (!filter) return true;

				const checkValue = (key: string) => component[key] === filter[key];
				const isFilterMatched = Object.keys(filter).every(checkValue);

				return isFilterMatched;
			});
		};

		return {
			exec: (): Entity<CT>[] => {
				return this.entities.filter(checkFilters);
			},
			and: <T extends keyof ComponentMap>(type: T, filter?: QueryFilter<T>) => {
				pairs.push({ type, filter });
				return this.query(null, null, pairs);
			},
		};
	};

	/**
	 * Add system to ECS, the execution priority will bases on adding order
	 */
	addSystem(system: System<CT, ET>): this {
		this.systems.push(system);
		return this;
	}

	addHandler(event: ET, handler: Handler<CT, ET>): this {
		this.eventHandlers[event.toString()] = handler;
		return this;
	}

	handle(event: ET) {
		const handler = this.eventHandlers[event.toString()];
		if (!handler) return;

		handler.handle(this);
		this.update();
	}

	update(): void {
		for (const system of this.systems) {
			system.update(this);
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
		ecs.nextEntityId = ecs.entities.length;

		return ecs;
	}
}
