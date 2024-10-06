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

	addComponent(entityId: number, component: Component<CT>) {
		this.entities[entityId].components[component.type.toString()] = component;
	}

	getComponent<T extends Component<CT>>(
		entity: Entity<CT>,
		componentType: string,
	) {
		return entity[componentType] as T;
	}

	addSystem(system: System<CT>): void {
		this.systems.push(system);
	}

	update(): void {
		for (const system of this.systems) {
			system.update(this.entities);
		}
	}

	toJSON(): object {
		return {
			entities: JSON.parse(JSON.stringify(this.entities)),
			systems: JSON.parse(JSON.stringify(this.systems)),
		};
	}
}
