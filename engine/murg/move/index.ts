import { distributeInitialCards, distributeTurnCards } from './distribute';
import { turnCleanUp } from './duel';
import { fight, postFight, preFight } from './fight';
import { reinforce } from './reinforce';
import { activateChargeSkill } from './skill';
import { summonCard } from './summon';
import { endTurn } from './turn';

export const move = {
	distributeInitialCards,
	distributeTurnCards,
	summonCard,
	endTurn,
	preFight,
	fight,
	postFight,
	reinforce,
	turnCleanUp,
	activateChargeSkill,
};
