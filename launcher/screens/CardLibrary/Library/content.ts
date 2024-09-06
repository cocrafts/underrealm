import { ClassType, ElementalType } from '@metacraft/murg-engine';
import type { CardTypeProps } from 'screens/CardLibrary/Library/shared';
import resources from 'utils/resources';

export const CardTypeContent: CardTypeProps[] = [
	{
		label: 'All Cards',
		value: -1,
		image: resources.card.type.all,
		displayName: 'All Cards',
	},
	{
		label: 'Hero',
		value: 0,
		image: resources.card.type.hero,
		displayName: 'Hero Cards',
	},
	{
		label: 'Troop',
		value: 1,
		image: resources.card.type.troop,
		displayName: 'Troop Cards',
	},
	{
		label: 'Spell',
		value: 2,
		image: resources.card.type.spell,
		displayName: 'Spell Cards',
	},
];

export const ClassTypeList = ['All Classes', ...Object.keys(ClassType)];
export const ClassTypeValueList = ['00', ...Object.values(ClassType)];
export const ElementalList = ['Any Elemental', ...Object.keys(ElementalType)];
export const ElementalValueList = ['00', ...Object.values(ElementalType)];
export const AttributeValues: number[] = [
	0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
];
export const AttackValuesList = ['Any Attack', ...AttributeValues];
export const HpValuesList = ['Any HP', ...AttributeValues];
export const DefenseValuesList = ['Any Defense', ...AttributeValues];
