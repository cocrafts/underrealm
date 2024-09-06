import { Node, tween, Vec3 } from 'cc';

export const raiseUnitPreview = async (
	node: Node,
	targetNode: Node,
): Promise<void> => {
	const at = targetNode.getPosition();
	const xOffset = at.x > 0 ? -170 : 170;
	const yOffset = at.y > 0 ? 26 : 26;

	return new Promise((resolve) => {
		node.setPosition(at.x + xOffset, at.y + yOffset);
		tween(node.getChildByPath('Card'))
			.set({ position: new Vec3(0, -15, 0), scale: new Vec3(0.6, 0.6, 1) })
			.to(0.15, { position: new Vec3(0, 0, 0) }, { easing: 'backOut' })
			.call(() => resolve())
			.start();
	});
};

export const raiseHandPreview = async (
	node: Node,
	from = -12,
	duration = 0.15,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath('Card'))
			.set({ position: new Vec3(0, from, 0) })
			.to(duration, { position: new Vec3(0, 0, 0) }, { easing: 'backOut' })
			.call(() => resolve())
			.start();
	});
};

export const raiseHandCard = async (
	node: Node,
	to = 100,
	duration = 0.1,
	path = 'front',
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath(path))
			.to(duration, { position: new Vec3(0, to, 0) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};
