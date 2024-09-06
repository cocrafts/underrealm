import { Node, Vec3 } from 'cc';

import { getGroundSize } from './helper';
import { system } from './system';

type ExpoAlign = 'left' | 'right';

export const getPositionExpos = (
	centerNode: Node = system.globalNodes.centerExpo,
	size: number,
	spacing = 220,
	align?: ExpoAlign,
): Vec3[] => {
	const positions: Vec3[] = [];
	const center = centerNode.getPosition();
	const totalSpace = spacing * size;
	const totalRadius = totalSpace / 2;
	const itemRadius = spacing / 2;
	const alignOffset = getAlignOffset(size, spacing, align);

	for (let i = 0; i < size; i += 1) {
		const offset = i * spacing - totalRadius + itemRadius;
		positions.push(new Vec3(center.x + offset + alignOffset, center.y, 0));
	}

	return positions;
};

const getAlignOffset = (
	size: number,
	spacing: number,
	align?: ExpoAlign,
): number => {
	if (!align) {
		return 0;
	} else if (align === 'left') {
		return (size * spacing) / 2;
	} else if (align === 'right') {
		return (size * spacing) / -2;
	}
};

export const getCenterExpos = (size: number): Vec3[] => {
	return getPositionExpos(system.globalNodes.centerExpo, size, 210);
};

export const getLeftExpos = (size: number): Vec3[] => {
	return getPositionExpos(system.globalNodes.leftExpo, size, 210, 'left');
};

export const getRightExpos = (size: number): Vec3[] => {
	return getPositionExpos(system.globalNodes.rightExpo, size, 210, 'right');
};

export const getHandExpos = (at: Node, size: number): Vec3[] => {
	return getPositionExpos(at, size, 80);
};

export const getGroundExpos = (at: Node): Vec3[] => {
	return getPositionExpos(at, getGroundSize(), 100);
};
