import type {
	ComponentMap,
	ComponentType,
	InferComponent,
} from '../components';
import type { EventType } from '../events';

export type QueryFilter<CM extends ComponentMap, T extends keyof CM> = Partial<
	Omit<InferComponent<CM, T>, 'type'>
>;

export interface Component<T> {
	type: T;
}

export interface Entity<CT> {
	id: number;
	components: Record<string, Component<CT>>;
	addComponent(component: Component<CT>): Entity<CT>;
	removeComponent(type: CT): Entity<CT>;
}

export interface System<CT, ET> {
	update(ecs: ECS<CT, ET>): void;
}

export interface Handler<CT, ET> {
	handle(ecs: ECS<CT, ET>): void;
}

export type ExportedECS = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	entities: any[];
};

export class ECS<
	CT = keyof ComponentMap, // Component type
	ET = EventType, // Event type
	CM extends ComponentMap = ComponentMap,
> {
	public entities: Entity<CT>[] = [];
	private systems: System<CT, ET>[] = [];
	private eventHandlers: Record<string, Handler<CT, ET>> = {};
	private nextEntityId = 0;

	createEntity(): Readonly<Entity<CT>> {
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

		this.entities.push(entity);

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

	query = <T extends keyof CM>(
		type?: T,
		filter?: QueryFilter<CM, T>,
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
			and: <T extends keyof CM>(type: T, filter?: QueryFilter<CM, T>) => {
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

	toJSON(): ExportedECS {
		return {
			entities: JSON.parse(JSON.stringify(this.entities)),
		};
	}

	static fromJSON<
		CT = ComponentType, // Component type
		ET = EventType, // Event type
		CM extends ComponentMap = ComponentMap,
	>(exported: ExportedECS): ECS<CT, ET, CM> {
		const ecs = new ECS<CT, ET>();
		ecs.entities = exported.entities;
		ecs.nextEntityId = ecs.entities.length;

		return ecs;
	}
}
