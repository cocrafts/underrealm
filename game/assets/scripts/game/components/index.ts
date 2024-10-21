import type { Node } from 'cc';

import type { Component } from '../../core';

export enum GameComponentType {
	DeckCounter = 'DeckCounter',
	PlayerController = 'PlayerController',
	CardNode = 'CardNode',
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: DeckCounter;
	[GameComponentType.PlayerController]: PlayerController;
	[GameComponentType.CardNode]: CardNode;
};

type DeckCounter = Component<GameComponentType.DeckCounter> & {
	node: Node;
	owner: string;
};

type PlayerController = Component<GameComponentType.PlayerController> & {
	node: Node;
	owner: string;
};

type CardNode = Component<GameComponentType.CardNode> & {
	node: Node;
};
