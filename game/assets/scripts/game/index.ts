import type { ComponentMap as LogicComponentMap } from '../core';
import { ComponentType as LogicComponentType, ECS } from '../core';
import type { EventType } from '../core/events';
import { duel } from '../core/templates';

import type { GameComponentMap } from './components';

export * from '../core';
export { GameComponentType, GameComponentType as GCT } from './components';
export { GameComponentMap, LogicComponentType as LCT, LogicComponentType };

export type CM = ComponentMap;
export type ComponentMap = GameComponentMap & LogicComponentMap;
export type GameECS = ECS<ComponentMap, EventType>;

export const core = ECS.fromJSON<ComponentMap, EventType>(duel);

export const system = {
	playerId: 'me',
	enemyId: 'enemy',
};
