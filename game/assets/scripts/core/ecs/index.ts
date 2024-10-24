import type { ComponentMap, DuelPhase } from '../components';
import type { EventMap } from '../events';

export type QueryFilter<T extends keyof CM, CM> = Partial<Omit<CM[T], 'type'>>;

export interface Component<T> {
	type: T;
}

export interface Entity<CM> {
	id: number;
	components: Record<string, Component<keyof CM>>;
	getComponent: <T extends keyof CM>(type: T) => CM[T];
	addComponent: <T extends keyof CM>(
		type: T,
		component: Omit<CM[T], 'type'>,
	) => Entity<CM>;
	removeComponent(type: keyof CM): Entity<CM>;
}

export interface System<CM, EM> {
	update(ecs: ECS<CM, EM>): void;
}

export interface Handler<CM, EM, ET extends keyof EM> {
	handle: (ecs: ECS<CM, EM>, event: EM[ET]) => void;
}

export type ExportedECS = {
	config: Config;
	state: DuelState;
	entities: never[];
};

export type QueryResult<CM> = Entity<CM>[] & {
	first: () => Entity<CM> | null;
};

export type Config = {
	initialCardCount: number;
	initialPlayerHealth: number;
	elementalFactor: number;
	handSize: number;
	groundSize: number;
	maxDeckSize: number;
	maxAttachment: number;
	spellIncreaseCycle: number;
	perTurnDraw: number;
	perTurnSummon: number;
	perTurnHero: number;
	perTurnSpell: number;
	perTurnTroop: number;
};

export type DuelState = {
	phase: DuelPhase;
	turnOf: string;
	summonCount: number;
};

export class ECS<CM = ComponentMap, EM = EventMap> {
	public config: Config;
	public state: DuelState;
	private entities: Entity<CM>[] = [];
	private systems: System<CM, EM>[] = [];
	private eventHandlers: Record<string, Handler<CM, EM, keyof EM>> = {};
	private nextEntityId = 0;
	public updateCount = 0;

	constructor(options?: { config?: Config; state?: DuelState }) {
		if (options?.config) this.config = options.config;
		if (options?.state) this.state = options.state;
	}

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

		return entity.components[type.toString()] as CM[T];
	}

	addComponent(entityId: number, component: Component<keyof CM>): this {
		this.entities[entityId].components[component.type.toString()] = component;
		return this;
	}

	removeComponent(entityId: number, type: keyof CM): this {
		delete this.entities[entityId].components[type.toString()];
		return this;
	}

	queryById = (entityId: number) => {
		if (entityId > this.entities.length) return;
		return this.entities[entityId];
	};

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
			exec: (): QueryResult<CM> => {
				const entities = this.entities.filter(checkFilters);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				(entities as any).first = () => {
					if (entities.length === 0) return;
					return entities[0];
				};

				return entities as QueryResult<CM>;
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
	addSystem<T = CM>(system: System<T, EM>): this {
		this.systems.push(system as never);
		return this;
	}

	addHandler<T extends keyof E, K = CM, E = EM>(
		event: T,
		handler: Handler<K, E, T>,
	): this {
		this.eventHandlers[event.toString()] = handler as never;
		return this;
	}

	handle<T = EM>(event: keyof T) {
		const handler = this.eventHandlers[event.toString()];
		if (!handler) return;

		handler.handle(this, event as never);
		this.update();
	}

	update(): void {
		for (const system of this.systems) {
			system.update(this);
		}
		this.updateCount++;
	}

	toJSON(): ExportedECS {
		return JSON.parse(
			JSON.stringify({
				config: this.config,
				state: this.state,
				entities: this.entities,
			}),
		);
	}

	static fromJSON<CM, ET>(exported: ExportedECS): ECS<CM, ET> {
		const { config, state } = exported;
		const ecs = new ECS<CM, ET>({ config, state });

		exported.entities.forEach(({ components }: Entity<CM>) => {
			const entity = ecs.createEntity();
			Object.keys(components).forEach((key) => {
				entity.addComponent(key as keyof CM, components[key] as never);
			});
		});

		return ecs;
	}
}
