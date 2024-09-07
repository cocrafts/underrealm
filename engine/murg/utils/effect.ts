import type { Effect, EffectIds, EffectMap } from './type';

export const mergeEffects = (first: EffectMap, second: EffectMap) => {
	Object.keys(second).forEach((effectId) => {
		const existingEffect = first[effectId];
		const targetEffect: Effect = second[effectId];

		if (existingEffect) {
			const merger: EffectMerger = mergerMap[effectId] || mergeCommon;
			first[effectId] = merger(first[effectId], second[effectId]);
		} else {
			first[effectId] = targetEffect;

			/* <- first Stack effect also assign initial attribute */
			if (targetEffect.id === 'AttributeStack') {
				first[effectId].attribute = targetEffect.attributeStack.attribute;
			}
		}
	});

	return first;
};

type EffectMerger = (first: Effect, second: Effect) => Effect;

const mergeLife = (first: Effect, second: Effect): number => {
	if (!second.life) return null;
	return (first.life || 0) + second.life;
};

const mergeCommon: EffectMerger = (first, second) => {
	return {
		...first,
		life: mergeLife(first, second),
	};
};

const mergeReborn: EffectMerger = (first, second) => {
	return {
		...first,
		life: mergeLife(first, second),
		reborn: {
			count: first.reborn.count + second.reborn.count,
		},
	};
};

const mergeAttribute: EffectMerger = (first, second) => {
	return {
		...first,
		life: mergeLife(first, second),
		attribute: second.attribute || first.attribute,
	};
};

const mergeStack: EffectMerger = (first, second) => {
	const stackOptions = second.attributeStack.attribute;
	const nextAttribute = {
		attack: stackOptions.attack,
		health: stackOptions.health,
		defense: stackOptions.defense,
	};

	if (first.attributeStack.targetId === second.attributeStack.targetId) {
		nextAttribute.attack += first.attribute.attack;
		nextAttribute.defense += first.attribute.defense;
		nextAttribute.health += first.attribute.health;
	}

	return {
		...first,
		life: mergeLife(first, second),
		attribute: nextAttribute,
	};
};

const mergeExplodeTimer: EffectMerger = (first, second) => {
	return {
		id: first.id,
		life: mergeLife(first, second),
		explodeTimer: second.explodeTimer || first.explodeTimer,
	};
};

const mergerMap: Partial<Record<EffectIds, EffectMerger>> = {
	Reborn: mergeReborn,
	Shield: mergeAttribute,
	SelfBuff: mergeAttribute,
	SpellBuff: mergeAttribute,
	AttributeStack: mergeStack,
	ExplodeTimer: mergeExplodeTimer,
};
