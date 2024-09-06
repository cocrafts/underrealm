import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import lodash from 'lodash';

import { animateCardAttack } from '../tween';
import { extractGroundMove, GroundMoves } from '../util/command';

const { CommandSourceType } = Engine;

export const playFight = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const combatTweens = [];
	const unitCommands = commands.filter(filterUnitSourced);
	const deathIds = commands.filter(filterRemoval).map((i) => i.target.from?.id);

	lodash
		.uniqBy(unitCommands, (i) => i.target?.source?.id)
		.forEach(({ target }, i) => {
			const fromCardId = target.source.id;
			const isDeath = deathIds.findIndex((i) => i === fromCardId) >= 0;

			combatTweens.push(animateCardAttack(fromCardId, isDeath, i));
		});

	await Promise.all(combatTweens);
};

const filterUnitSourced = (i) => {
	return i.target?.source?.type === CommandSourceType.Unit;
};

const filterRemoval = (i) => {
	return extractGroundMove(i) === GroundMoves.Removal;
};
