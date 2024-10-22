import type { Node, Vec3 } from 'cc';

import type { Component } from '../../core';

export enum GameComponentType {
	DeckCounter = 'DeckCounter',
	PlayerController = 'PlayerController',
	CardNode = 'CardNode',
	CardUIState = 'CardUIState',
	CardInHandPosition = 'CardInHandPosition',
}

export type GameComponentMap = {
	[GameComponentType.DeckCounter]: DeckCounter;
	[GameComponentType.PlayerController]: PlayerController;
	[GameComponentType.CardNode]: CardNode;
	[GameComponentType.CardUIState]: CardUIState;
	[GameComponentType.CardInHandPosition]: CardInHandPosition;
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

type CardUIState = Component<GameComponentType.CardUIState> & {
	dragging: boolean;
};

type CardInHandPosition = Component<GameComponentType.CardInHandPosition> & {
	position: Vec3;
};
