import { Node, tween, Vec3 } from 'cc';

import { playEffectSound } from '../util/resources';
import { system } from '../util/system';

export const animateGroundRemoval = (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		const from = node.getPosition();
		const randomOffset = Math.random() * 1280 - 640;

		node.parent = system.globalNodes.playerHand;
		tween(node)
			.to(
				0.5,
				{
					position: new Vec3(randomOffset, from.y > 0 ? 600 : -600, 0),
					scale: new Vec3(0.6, 0.6, 1),
				},
				{ easing: 'expoIn' },
			)
			.call(() => {
				playEffectSound('death', 0.5);
				node.destroy();
				resolve();
			})
			.start();
	});
};

export const animateUnitRaise = (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		const unitPosition = node.getPosition();
		const distance = unitPosition.y > 0 ? -20 : 20;

		tween(node)
			.by(0.25, { position: new Vec3(0, distance, 0) }, { easing: 'expoOut' })
			.delay(0.5)
			.call(resolve)
			.by(0.25, { position: new Vec3(0, -distance, 0) }, { easing: 'expoOut' })
			.start();
	});
};
