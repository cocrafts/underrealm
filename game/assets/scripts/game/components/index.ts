import type { Node } from 'cc';

import type { Component } from '../../core';

export enum GameComponentType {
	DeckCounter = 'DeckCounter',
	PlayerController = 'PlayerController',
	CardManagerState = 'CardManagerState',
	CardNode = 'CardNode',
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: DeckCounter;
	[GameComponentType.PlayerController]: PlayerController;
	[GameComponentType.CardManagerState]: CardManagerState;
	[GameComponentType.CardNode]: CardNode;
};

type DeckCounter = Component<GameComponentType.DeckCounter> & {
	node: Node;
	owner: string;
};

type PlayerController = Component<GameComponentType.PlayerController> & {
	healthNode: Node;
	healthPredictNode: Node;
	owner: string;
};

type CardManagerState = Component<GameComponentType.CardManagerState> & {
	initialized: boolean;
};

type CardNode = Component<GameComponentType.CardNode> & {
	node: Node;
};
