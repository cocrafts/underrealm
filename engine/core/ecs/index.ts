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
	private entities: Entity<CT>[] = [];
	private systems: System<CT>[] = [];
	private eventHandlers: Record<string, Handler<CT>> = {};
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

	toJSON(): object {
		return {
			entities: JSON.parse(JSON.stringify(this.entities)),
		};
	}
}
