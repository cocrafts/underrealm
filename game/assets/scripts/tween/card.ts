import { Node, Quat, Tween, tween, UIOpacity, Vec3 } from 'cc';

import { playEffectSound } from '../util/resources';

export interface PlayerCardOption {
	node: Node;
	delay?: number;
	from?: Vec3;
	dest?: Vec3;
	expoDest?: Vec3;
	speed?: number;
}

const defaultExpoDest = new Vec3(440, -15, 0);
const defaultFrom = new Vec3(425, -232, 0);

export const animateExpoCard = ({
	node,
	from = defaultFrom,
	dest = defaultExpoDest,
	delay = 0,
	speed = 1,
}: PlayerCardOption): Tween<Node> => {
	let flipped = false;
	const p1 = new Vec3(dest.x, dest.y - 25, dest.z);
	const r1 = Quat.fromEuler(new Quat(), 90, 90, 91);
	const r2 = Quat.fromEuler(new Quat(), 12, 0, 0);
	const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);
	const translate = tween(node)
		.set({ position: from })
		.to(0.5 / speed, { position: p1 }, { easing: 'cubicIn' })
		.to(1.5 / speed, { position: dest }, { easing: 'backIn' });

	const rotate = tween(node)
		.set({ rotation: r1, active: true })
		.to(
			0.5 / speed,
			{ rotation: r2 },
			{
				easing: 'cubicIn',
				onUpdate: (node: Node) => {
					if (flipped) return;
					const angle = new Vec3(0, 0, 0);
					node.rotation.getEulerAngles(angle);

					if (angle.z < 30) {
						playEffectSound('card-flip', 0.3);
						node.getChildByPath('back').active = false;
						flipped = true;
					}
				},
			},
		)
		.to(1.5 / speed, { rotation: r3 }, { easing: 'quadIn' });

	const scale = tween(node)
		.set({ scale: new Vec3(0.18, 0.18, 1) })
		.to(0.5 / speed, { scale: new Vec3(0.48, 0.48, 1) }, { easing: 'quadIn' })
		.to(1 / speed, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'quadOut' });

	return tween(node).delay(delay).parallel(translate, rotate, scale);
};

const defaultRevealDest = new Vec3(0, -360, 0);

export const animateDrawPlayerCard = ({
	node,
	from = defaultFrom,
	expoDest = defaultExpoDest,
	dest = defaultRevealDest,
	delay = 0,
	speed = 1,
}: PlayerCardOption): Promise<void> => {
	return new Promise((resolve) => {
		animateExpoCard({ node, from, dest: expoDest, delay, speed })
			.to(
				0.8,
				{ position: dest, scale: new Vec3(0.4, 0.4, 1) },
				{ easing: 'expoOut' },
			)
			.call(() => {
				playEffectSound('light-fire', 0.3);
				resolve();
			})
			.start();
	});
};

export interface EnemyCardOption {
	node: Node;
	from: Vec3;
	dest: Vec3;
	delay: number;
}

export const animateDrawEnemyCard = ({
	node,
	from,
	dest,
	delay = 0,
}: EnemyCardOption): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 0, 0, 90);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 180);

		tween(node)
			.delay(delay)
			.call(() => playEffectSound('card-flip', 0.3))
			.set({ position: from, rotation: r1, scale: new Vec3(0.18, 0.18, 1) })
			.to(
				1,
				{ position: dest, rotation: r2, scale: new Vec3(0.28, 0.28, 1) },
				{ easing: 'expoInOut' },
			)
			.call(() => resolve())
			.start();
	});
};

export const animateGlowOn = (node: Node): void => {
	const glow = node.getChildByPath('glow');

	glow.active = true;
	tween(glow.getComponent(UIOpacity))
		.set({ opacity: 0 })
		.to(3, { opacity: 150 }, { easing: 'expoOut' })
		.start();
};

export const animateGlowOff = (node: Node): void => {
	const glow = node.getChildByPath('glow');

	tween(glow.getComponent(UIOpacity))
		.to(1, { opacity: 0 }, { easing: 'expoOut' })
		.call(() => (glow.active = false))
		.start();
};

export const animateGroundReveal = (
	node: Node,
	distance = 50,
): Promise<void> => {
	return new Promise((resolve) => {
		let flipped = false;
		const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);

		const translate = tween(node)
			.by(0.25, { position: new Vec3(0, distance, 0) }, { easing: 'backOut' })
			.by(0.75, { position: new Vec3(0, -distance, 0) }, { easing: 'expoOut' });
		const scale = tween(node)
			.to(0.25, { scale: new Vec3(0.25, 0.25, 1) })
			.to(0.75, { scale: new Vec3(0.24, 0.24, 1) }, { easing: 'backOut' });
		const rotate = tween(node)
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

						if (angle.x < 90) {
							node.getChildByPath('back').active = false;
							flipped = true;
						}
					},
				},
			)
			.call(resolve)
			.start();

		tween(node).parallel(translate, scale, rotate).call(resolve).start();
	});
};
