import type { ComponentType } from '../../components';
import type { Entity } from '../../ecs';

export const summonActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const passiveActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const fightActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const preFightActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const chargeActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const inspireActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};

export const gloryActivationSystem = () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		update: (entities: Entity<ComponentType>[]) => {},
	};
};
