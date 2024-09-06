import { Color, Label, Node, tween, UIOpacity, Vec3 } from 'cc';

import { system } from '../util/system';

export const simpleMove = async (
	node: Node,
	to: Vec3,
	duration = 0.2,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.to(duration, { position: to }, { easing: 'expoInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animateFade = async (
	node: Node,
	to: number,
	duration = 2,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getComponent(UIOpacity))
			.to(duration, { opacity: to }, { easing: 'fade' })
			.call(() => resolve())
			.start();
	});
};

export const animateSwapLabel = async (
	node: Node,
	toLabel: string,
	toColor: Color,
	duration = 1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getComponent(UIOpacity))
			.to(
				duration / 2,
				{ opacity: 0 },
				{
					easing: 'fade',
					onComplete: () => {
						const label = node.getComponent(Label);
						label.string = toLabel;
						label.color = toColor; //Color.fromVec4(new Vec4(0, 0, 0, 1));
					},
				},
			)
			.to(duration / 2, { opacity: 255 }, { easing: 'expoInOut' })
			.call(() => resolve())
			.start();
	});
};

export const shakeGround = (strength = 5, volume = 5): void => {
	const instance = tween(system.globalNodes.board.getChildByPath('Surface'));

	for (let i = 0; i < volume; i += 1) {
		const x = Math.random() * strength;
		const y = Math.random() * strength;

		instance.to(0, { position: new Vec3(x, y, 0) }).delay(0.08);
	}

	instance.to(0.5, { position: new Vec3(0, 0, 0) }).start();
};

export const animateSkillReady = (cardNode: Node): void => {
	tween(cardNode)
		.by(1, { position: new Vec3(0, 20, 0) }, { easing: 'expoOut' })
		.by(1, { position: new Vec3(0, -20, 0) }, { easing: 'expoOut' })
		.repeatForever()
		.start();
};
