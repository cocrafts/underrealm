import type { ComponentMap as LogicComponentMap } from '../core';
import { ComponentType as LogicComponentType, ECS } from '../core';
import type { EventMap } from '../core/events';
import { ecsv1 } from '../core/templates';

import type { GameComponentMap } from './components';

export * from '../core';
export { GameComponentType, GameComponentType as GCT } from './components';
export { GameComponentMap, LogicComponentType as LCT, LogicComponentType };

export type CM = ComponentMap;
export type ComponentMap = GameComponentMap & LogicComponentMap;
export type GameECS = ECS<ComponentMap, EventMap>;

export const core = ECS.fromJSON<ComponentMap, EventMap>(ecsv1);

export const system = {
	playerId: 'me',
	enemyId: 'enemy',
};
