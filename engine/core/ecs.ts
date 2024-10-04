export type Key = string | number;

export interface Component<T extends Key> {
	type: T;
}

export interface Entity<CT extends Key> {
	id: number;
	components: Record<string, Component<CT>>;
}

export interface System<T extends Key> {
	update(entities: Entity<T>[]): void;
}

export class ECS<CT extends string = string> {
	private entities: Entity<CT>[] = [];
	private systems: System<CT>[] = [];
	private nextEntityId = 0;

	createEntity(): Entity<CT> {
		const entity: Entity<CT> = {
			id: this.nextEntityId++,
			components: {},
		};

		return entity;
	}

	addComponent(entity: Entity<CT>, component: Component<CT>): void {
		entity[component.type.toString()] = component;
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
}
