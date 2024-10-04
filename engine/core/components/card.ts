import type { Component } from '../ecs';

import type { CardPlace } from './types';
import type { ComponentType } from './types';

export type Metadata = Component<ComponentType.Metadata> & {
	id: string;
	name: string;
	class: ClassType.Assassin;
	kind: CardType.Hero;
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
	Assassin = '01',
	Knight = '02',
	Tanker = '03',
	Wizard = '04',
	Summoner = '05',
	Beast = '06',
}

export enum CardType {
	Hero,
	Troop,
	Spell,
}
