import type { Node } from 'cc';

import type { Component } from '../../core';

export enum GameComponentType {
	DeckCounter = 'DeckCounter',
	PlayerController = 'PlayerController',
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: DeckCounter;
	[GameComponentType.PlayerController]: PlayerController;
};

type DeckCounter = Component<GameComponentType> & {
	node: Node;
	owner: string;
};

type PlayerController = Component<GameComponentType> & {
	healthNode: Node;
	healthPredictNode: Node;
	owner: string;
};
