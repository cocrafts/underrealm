import { Animation, Node, Quat, tween, Vec3 } from 'cc';

import { updatePlayers, updateUnit } from '../util/attribute';
import { instantiatePrefab, playEffectSound } from '../util/resources';
import { system } from '../util/system';

import { shakeGround } from './common';

export const animateCardAttack = async (
	cardId: string,
	isDeath: boolean,
	index: number,
): Promise<void> => {
	return new Promise((resolve) => {
		const node = system.cardRefs[cardId];
		if (!node) return resolve();

		let flipped = false;
		const from = node.getPosition();
		const backFace = node.getChildByPath('back');
		const isMovingUp = from.y < 0;
		const fastSeed = 12;
		const fastDelta = isMovingUp ? -fastSeed : fastSeed;
		const r1 = Quat.fromEuler(new Quat(), 0, 180, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);

		const translate = tween(node)
			.to(
				1,
				{ position: new Vec3(from.x, from.y + fastDelta, 0) },
				{ easing: 'backOut' },
			)
			.to(0.2, { position: new Vec3(from.x, 0, 0) }, { easing: 'expoOut' })
			.call(() => {
				updateUnit(cardId);

				if (index === 0) {
					playEffectSound('attack', 1);
					shakeGround(10, 5);
					updatePlayers();
				}

				instantiatePrefab('prefabs/HitEffect').then((hit) => {
					hit.parent = node;
					hit.setScale(new Vec3(5, 5, 1));
					const animation = hit.getComponent(Animation);

					animation.play('flip');
					animation.on(Animation.EventType.FINISHED, () => {
						hit.destroy();
					});
				});
			})
			.to(0.5, { position: from }, { easing: 'expoOut' });

		const rotate = backFace?.active
			? tween(node)
					.set({ rotation: r1 })
					.to(
						1,
						{ rotation: r2 },
						{
							easing: 'expoOut',
							onUpdate: (node: Node) => {
								if (flipped) return;
								const angle = new Vec3(0, 0, 0);
								node.rotation.getEulerAngles(angle);

								if (angle.y < 90) {
									node.getChildByPath('front').active = true;
									backFace.active = false;
									flipped = true;
								}
							},
						},
					)
			: tween(node).delay(1);

		if (isDeath) {
			const randomOffset = Math.random() * 1280 - 640;

			node.parent = system.globalNodes.playerHand;
			translate
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
				});
		} else {
			translate.to(0.5, { position: from }, { easing: 'backOut' });
		}

		tween(node).parallel(translate, rotate).call(resolve).start();
	});
};

export const animateRelocate = async (node: Node, to: Vec3): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.to(0.2, { position: to }, { easing: 'expoOut' })
			.call(() => {
				playEffectSound('light-fire', 0.5);
				resolve();
			})
			.start();
	});
};
