import type { Node, Tween } from 'cc';
import { Quat, tween, Vec3 } from 'cc';

import { playEffectSound } from '../../util/resources';

export const defaultCardScale = new Vec3(0.4, 0.4, 1);
export const detailedCardScale = new Vec3(0.6, 0.6, 1);

export interface DrawExpoCardOptions {
	node: Node;
	from: Vec3;
	dest: Vec3;
}

export const drawExpoCard = ({ node, from, dest }: DrawExpoCardOptions) => {
	return new Promise<void>((resolve) => {
		animateExpoCard({ node, from })
			.to(
				0.8,
				{ position: dest, scale: defaultCardScale },
				{ easing: 'expoOut' },
			)
			.call(() => {
				playEffectSound('light-fire', 0.3);
				resolve();
			})
			.start();
	});
};

interface ExpoCardOptions {
	node: Node;
	from: Vec3;
}

const animateExpoCard = ({ node, from }: ExpoCardOptions): Tween<Node> => {
	let flipped = false;
	const delay = 0;
	const speed = 1;
	const dest = from.clone().add3f(0, 240, 0);
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

export const drawCard = ({ node, from, dest }: DrawExpoCardOptions) => {
	return new Promise<void>((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 0, 0, 90);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 180);
		const s1 = new Vec3(0.18, 0.18, 1);
		const s2 = new Vec3(0.28, 0.28, 1);

		tween(node)
			.set({ position: from, rotation: r1, scale: s1 })
			.to(
				1,
				{ position: dest, rotation: r2, scale: s2 },
				{ easing: 'expoInOut' },
			)
			.call(() => {
				playEffectSound('card-flip', 0.3);
				resolve();
			})
			.start();
	});
};

type RevealCardOptions = {
	node: Node;
};

export const revealCard = ({ node }: RevealCardOptions) => {
	return new Promise((resolve) => {
		let flipped = false;
		const distance = 50;

		const translate = tween(node)
			.by(0.25, { position: new Vec3(0, distance, 0) }, { easing: 'backOut' })
			.by(0.75, { position: new Vec3(0, -distance, 0) }, { easing: 'expoOut' });

		const scale = tween(node)
			.to(0.25, { scale: new Vec3(0.25, 0.25, 1) })
			.to(0.75, { scale: new Vec3(0.24, 0.24, 1) }, { easing: 'backOut' });

		const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);
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
