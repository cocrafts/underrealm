import type { DuelCommandBundle } from '@underrealm/murg';
import Engine from '@underrealm/murg';
import { instantiate } from 'cc';

import {
	animateAirSummon,
	animateGroundRemoval,
	animateRelocate,
	animateUnitRaise,
} from '../tween';
import { UnitManager } from '../UnitManager';
import { extractGroundMove, GroundMoves } from '../util/command';
import { selectGroundGuide, selectGroundNode } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { CommandSourceType } = Engine;

const skillSources = [
	CommandSourceType.InspiredSkill,
	CommandSourceType.PostFightSkill,
	CommandSourceType.PreFightSkill,
];

export const playGeneric = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const isSkillCasting =
			skillSources.indexOf(command.target?.source?.type) >= 0;
		const groundMove = extractGroundMove(command);

		if (isSkillCasting) {
			const node = system.cardRefs[command.target.source.id];
			if (node) await animateUnitRaise(node);
		}

		if (groundMove === GroundMoves.Removal) {
			const node = system.cardRefs[command.target.from.id];
			if (node) await animateGroundRemoval(node);
		} else if (groundMove === GroundMoves.GenerateFromAir) {
			const cardId = command.target.from.id;
			const unitNode = instantiate(system.globalNodes.unitTemplate);
			const expos = getGroundExpos(selectGroundGuide(command.target.to.owner));

			unitNode.getComponent(UnitManager).setCardId(cardId);
			unitNode.parent = selectGroundNode(command.target.to.owner);
			system.cardRefs[cardId] = unitNode;

			await animateAirSummon(unitNode, expos[command.target.to.index]);
		} else if (groundMove === GroundMoves.Relocate) {
			const node = system.cardRefs[command.target.from.id];

			if (node) {
				const owner = command.target.to.owner;
				const isMine = owner === system.playerIds.me;
				const groundGuide = isMine
					? system.globalNodes.playerGroundGuide
					: system.globalNodes.enemyGroundGuide;
				const expos = getGroundExpos(groundGuide);

				await animateRelocate(node, expos[command.target.to.index]);
			}
		}
	}
};
