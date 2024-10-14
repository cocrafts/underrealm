import type { Node } from 'cc';

import type { Component } from '../../core';

export enum GameComponentType {
	DeckCounter = 'DeckCounter',
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: DeckCounter;
};

type DeckCounter = Component<GameComponentType> & {
	node: Node;
	owner: string;
};
