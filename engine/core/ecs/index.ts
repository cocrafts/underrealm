export type Key = string | number;

export interface Component<T extends Key> {
	type: T;
}

export interface Entity<CT extends Key> {
	id: number;
	components: Record<string, Component<CT>>;
	addComponent(component: Component<CT>): Entity<CT>;
}

export interface System<T extends Key> {
	update(entities: Entity<T>[]): void;
}

export class ECS<CT extends string = string> {
	private entities: Entity<CT>[] = [];
	private systems: System<CT>[] = [];
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
		};
		this.entities.push(entity);

		return entity;
	}

	getComponent<T extends Component<CT>>(
		entityId: number,
		componentType: string,
	) {
		return this.entities[entityId][componentType] as T;
	}

	addComponent(entityId: number, component: Component<CT>): this {
		this.entities[entityId].components[component.type.toString()] = component;
		return this;
	}

	/**
	 * Add system to ECS, the execution priority will bases on adding order
	 */
	addSystem(system: System<CT>): this {
		this.systems.push(system);
		return this;
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
