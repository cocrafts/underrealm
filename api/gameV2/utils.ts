import type { ComponentMap, ECS } from '@underrealm/game';
import { actions, activation, DuelPhase, turnCardDraw } from '@underrealm/game';

export const addPackageSystems = (ecs: ECS<ComponentMap>) => {
	ecs
		.addSystem(turnCardDraw())

		.addSystem(activation.preFight())
		// .addSystem(skill.destroyFacingMinHealth(ActivationType.PreFight))
		.addSystem(actions.changePhase(DuelPhase.Fight))

		.addSystem(activation.fight())
		.addSystem(actions.fight())
		.addSystem(actions.changePhase(DuelPhase.PostFight))

		.addSystem(activation.postFight())
		.addSystem(actions.changePhase(DuelPhase.CleanUp))
		.addSystem(actions.cleanUp())
		.addSystem(actions.changePhase(DuelPhase.Draw));
};
