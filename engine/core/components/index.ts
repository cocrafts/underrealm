import type {
	Attribute,
	Chargeable,
	Classification,
	Metadata,
	Ownership,
	Place,
} from './card';
import { CardPlace, ComponentType } from './types';

type ComponentMap = {
	[ComponentType.Metadata]: Metadata;
	[ComponentType.Attribute]: Attribute;
	[ComponentType.Classification]: Classification;
	[ComponentType.Chargeable]: Chargeable;
	[ComponentType.Ownership]: Ownership;
	[ComponentType.Place]: Place;
};

type InferComponent<T extends keyof ComponentMap> = ComponentMap[T];

export const createComponent = <T extends keyof ComponentMap>(
	type: T,
	value: Omit<InferComponent<T>, 'type'>,
): InferComponent<T> => {
	return { ...value, type } as never;
};

export const c1 = createComponent(ComponentType.Attribute, {
	attack: 0,
	defense: 1,
	health: 123,
});

export const c2 = createComponent(ComponentType.Place, {
	index: 0,
	place: CardPlace.Ground,
});
