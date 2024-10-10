import type { Node } from 'cc';

export enum GameComponentType {
	DeckCounter,
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: { node: Node };
};
