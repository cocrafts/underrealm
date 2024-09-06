import { Label, Sprite, tween, UIOpacity, Vec3 } from 'cc';

import { playBackgroundSound, playEffectSound } from '../util/resources';
import { system } from '../util/system';

export const showTurnRibbon = async (message: string): Promise<void> => {
	const node = system.globalNodes.turnRibbon;
	const uiOpacity = node.getComponent(UIOpacity);

	node.getChildByPath('message').getComponent(Label).string = message;
	return new Promise((resolve) => {
		tween(node)
			.set({
				scale: new Vec3(0, 0, 1),
				position: new Vec3(0, 25, 0),
			})
			.call(() => playEffectSound('your-turn4', 0.2))
			.to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
			.delay(1)
			.call(() => playEffectSound('your-turn3', 0.2))
			.call(() => {
				tween(uiOpacity)
					.to(0.25, { opacity: 0 })
					.call(() => {
						node.setPosition(new Vec3(9999, 0, 0));
						uiOpacity.opacity = 255;
						resolve();
					})
					.start();
			})
			.to(0.25, { scale: new Vec3(0, 0, 1) }, { easing: 'backIn' })
			.start();
	});
};

export const showEndGameRibbon = async (isVictory: boolean): Promise<void> => {
	return new Promise((resolve) => {
		const node = system.globalNodes.duelRibbon;
		const sound = isVictory ? 'victory' : 'defeat';

		node.getChildByPath('ribbon').getComponent(Sprite).grayscale = !isVictory;
		node.getChildByPath('avatar/image').getComponent(Sprite).grayscale =
			!isVictory;
		node.getChildByPath('message').getComponent(Label).string = isVictory
			? 'Victory!'
			: 'Defeat!';

		system.globalNodes.playerHand.parent =
			system.globalNodes.board.getChildByPath('Surface');
		tween(system.globalNodes.fog.getComponent(UIOpacity))
			.to(2, { opacity: 255 })
			.start();

		tween(node)
			.set({
				scale: new Vec3(0, 0, 1),
				position: new Vec3(0, -54, 0),
			})
			.call(() => {
				playBackgroundSound(sound, 0.5, false);
			})
			.to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
			.call(resolve)
			.start();
	});
};
