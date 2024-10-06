import type { Component } from '../ecs';

import type { CardPlace } from './types';
import type { ComponentType } from './types';

export type Metadata = Component<ComponentType.Metadata> & {
	name: string;
	class: ClassType;
	kind: CardType;
	rarity: 0;
};

export type Classification = Component<ComponentType.Classification> & {
	kind: CardType;
	class: ClassType;
};

export type Attribute = Component<ComponentType.Attribute> & {
	attack: number;
	health: number;
	defense: number;
};

export type Place = Component<ComponentType.Place> & {
	index: number;
	place: CardPlace;
};

export type Ownership = Component<ComponentType.Ownership> & {
	owner: string;
};

export type Chargeable = Component<ComponentType.Chargeable> & {
	charge: number;
};

export enum ClassType {
	Assassin = 'Assassin',
	Knight = 'Knight',
	Tanker = 'Tanker',
	Wizard = 'Wizard',
	Summoner = 'Summoner',
	Beast = 'Beast',
}

export enum CardType {
	Hero = 'Hero',
	Troop = 'Troop',
	Spell = 'Spell',
}
