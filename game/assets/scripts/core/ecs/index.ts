import type { ComponentMap } from '../components';
import type { EventType } from '../events';

export type InferComponent<T extends keyof CM, CM> = CM[T];

export type QueryFilter<T extends keyof CM, CM> = Partial<
	Omit<InferComponent<T, CM>, 'type'>
>;

export interface Component<T> {
	type: T;
}

export interface Entity<CM> {
	id: number;
	components: Record<string, Component<keyof CM>>;
	getComponent: <T extends keyof CM>(type: T) => InferComponent<T, CM>;
	addComponent: <T extends keyof CM>(
		type: T,
		component: Omit<InferComponent<T, CM>, 'type'>,
	) => Entity<CM>;
	removeComponent(type: keyof CM): Entity<CM>;
}

export interface System<CM, ET = EventType> {
	update(ecs: ECS<CM, ET>): void;
}

export interface Handler<CM, ET = EventType> {
	handle(ecs: ECS<CM, ET>): void;
}

export type ExportedECS = {
	entities: never[];
};

export class ECS<CM = ComponentMap, ET = EventType> {
	private entities: Entity<CM>[] = [];
	private systems: System<CM, ET>[] = [];
	private eventHandlers: Record<string, Handler<CM, ET>> = {};
	private nextEntityId = 0;

	createEntity(): Readonly<Entity<CM>> {
		const entityId = this.nextEntityId++;

		const entity: Entity<CM> = {
			id: entityId,
			components: {},
			getComponent: (type) => {
				return this.getComponent(entityId, type);
			},
			addComponent: (type, component) => {
				component = { ...component, type };
				this.addComponent(entityId, component as never);
				return entity;
			},
			removeComponent: (type) => {
				this.removeComponent(entityId, type);
				return entity;
			},
		};

		this.entities.push(entity);

		return entity;
	}

	private getComponent<T extends keyof CM>(entityId: number, type: T) {
		const entity = this.entities[entityId];
		if (!entity.components[type.toString()]) {
			throw Error(`Entity '${entity.id}': '${type.toString()}' not found`);
		}

		return entity.components[type.toString()] as InferComponent<T, CM>;
	}

	addComponent(entityId: number, component: Component<keyof CM>): this {
		this.entities[entityId].components[component.type.toString()] = component;
		return this;
	}

	removeComponent(entityId: number, type: keyof CM): this {
		delete this.entities[entityId].components[type.toString()];
		return this;
	}

	query = <T extends keyof CM>(
		type?: T,
		filter?: QueryFilter<T, CM>,
		pairs = [],
	) => {
		if (type) pairs.push({ type, filter });

		const checkFilters = (entity: Entity<CM>) => {
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
			exec: (): Entity<CM>[] => {
				return this.entities.filter(checkFilters);
			},
			and: <T extends keyof CM>(type: T, filter?: QueryFilter<T, CM>) => {
				pairs.push({ type, filter });
				return this.query(null, null, pairs);
			},
		};
	};

	/**
	 * Add system to ECS, the execution priority will bases on adding order
	 */
	addSystem<T = CM>(system: System<T, ET>): this {
		this.systems.push(system as never);
		return this;
	}

	addHandler(event: ET, handler: Handler<CM, ET>): this {
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

	toJSON(): ExportedECS {
		return {
			entities: JSON.parse(JSON.stringify(this.entities)),
		};
	}

	static fromJSON<CM, ET>(exported: ExportedECS): ECS<CM, ET> {
		const ecs = new ECS<CM, ET>();

		exported.entities.forEach(({ components }: Entity<CM>) => {
			const entity = ecs.createEntity();
			Object.keys(components).forEach((key) => {
				entity.addComponent(key as keyof CM, components[key] as never);
			});
		});

		return ecs;
	}
}
