import type { Animation, Node } from 'cc';

export const playAnimation = (
	node: Node,
	name = 'fade-in',
	duration?: number,
): void => {
	const animation = node.getComponent('cc.Animation') as Animation;

	if (duration) {
		const state = animation.getState(name);
		state.duration = duration;
	}

	animation.play(name);
};
