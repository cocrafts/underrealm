import type { SkillIds, SkillRunner } from '../utils/type';

import { attributeStack } from './attributeStack';
import { createIllusion } from './createIllusion';
import { destroyFacingMinHealth } from './destroyFacingMinHealth';
import { frontMutate } from './frontMutate';
import { lowestHealthMutate } from './lowestHealthMutate';
import { minHealthSteal } from './minHealthSteal';
import { playerMutate } from './playerMutate';
import { randomEnemyMutate } from './randomEnemyMutate';
import { selfBuffAndCleaver } from './selfBuffAndCleaver';
import { selfMutate } from './selfMutate';
import { summonSnake } from './summonSnake';

export const skillMap: Record<SkillIds, SkillRunner> = {
	MinHealthSteal: minHealthSteal,
	SelfMutate: selfMutate,
	FrontMutate: frontMutate,
	DestroyFacingMinHealth: destroyFacingMinHealth,
	RandomEnemyMutate: randomEnemyMutate,
	LowestHealthMutate: lowestHealthMutate,
	PlayerMutate: playerMutate,
	CreateIllusion: createIllusion,
	SummonSnake: summonSnake,
	SelfBuffAndCleaver: selfBuffAndCleaver,
	AttributeStack: attributeStack,
};
