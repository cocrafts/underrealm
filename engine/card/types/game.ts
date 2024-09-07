import type { Card } from './card';

export interface GameMeta {
	version: string;
	entities: string[];
	map: Record<string, Card>;
}
