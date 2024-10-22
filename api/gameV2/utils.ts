import type { ComponentMap, ECS } from '@underrealm/game';
import { actions, activation, DuelPhase, turnCardDraw } from '@underrealm/game';

export const addPackageSystems = (ecs: ECS<ComponentMap>) => {
	ecs
		.addSystem(turnCardDraw())
		.addSystem(actions.summon())
		// .addSystem(skill.destroyFacingMinHealth(ActivationType.Summon))
		.addSystem(actions.endTurn())

		.addSystem(activation.preFight())
		// .addSystem(skill.destroyFacingMinHealth(ActivationType.PreFight))
		.addSystem(actions.changePhase(DuelPhase.Fight))

		.addSystem(activation.fight())
		.addSystem(actions.fight())
		.addSystem(actions.changePhase(DuelPhase.PostFight))

		.addSystem(activation.postFight())
		.addSystem(actions.changePhase(DuelPhase.CleanUp))
		.addSystem(actions.changePhase(DuelPhase.Draw));
};
