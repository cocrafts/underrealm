import type { CardState } from '../../types';
import { SummonSide } from '../../types';

interface GroundSize {
	centerIndex: number;
	sideLength: number;
	all: number;
	left: number;
	right: number;
}

export const addToGround = (
	card: CardState,
	ground: CardState[],
	side: SummonSide = SummonSide.Right,
): boolean => {
	const sizes = getGroundSizes(ground);

	if (sizes.all === 0) {
		if (ground[sizes.centerIndex]) return false;

		ground[sizes.centerIndex] = card;
	} else if (side === SummonSide.Left) {
		const unitIndex = sizes.sideLength - sizes.left - 1;
		if (ground[unitIndex] || sizes.left > sizes.sideLength) return false;

		ground[unitIndex] = card;
	} else if (side === SummonSide.Right) {
		const unitIndex = sizes.sideLength + sizes.right + 1;
		if (ground[unitIndex] || sizes.right > sizes.sideLength) return false;

		ground[unitIndex] = card;
	}

	return true;
};

export const getGroundSizes = (ground: CardState[]) => {
	const sideLength = Math.floor(ground.length / 2);
	const size: GroundSize = {
		centerIndex: sideLength,
		sideLength,
		all: 0,
		left: 0,
		right: 0,
	};

	for (let i = 0; i < ground.length; i += 1) {
		if (ground[i]) {
			size.all += 1;

			if (i < sideLength) {
				size.left += 1;
			} else if (i > sideLength) {
				size.right += 1;
			}
		}
	}

	return size;
};

export const reinforceArray = <T = CardState>(items: T[]): T[] => {
	const result: T[] = [...items];
	const sideLength = Math.floor(result.length / 2);
	const leftItems = result.slice(0, sideLength);
	const rightItems = result.slice(sideLength, result.length);
	const leftWeight = leftItems.filter((i) => !!i).length;
	const rightWeight = rightItems.filter((i) => !!i).length;

	const reinforceLeft = () => {
		const relocate = (offset: number): void => {
			if (!result[offset]) return;

			for (let i = sideLength; i >= offset; i -= 1) {
				if (!result[i]) {
					result[i] = result[offset];
					result[offset] = null;
				}
			}
		};

		for (let i = sideLength - 1; i >= 0; i -= 1) {
			relocate(i);
		}
	};

	const reinforceRight = () => {
		const relocate = (offset: number): void => {
			if (!result[offset]) return;

			for (let i = sideLength; i < offset; i += 1) {
				if (!result[i]) {
					result[i] = result[offset];
					result[offset] = null;
				}
			}
		};

		for (let i = sideLength + 1; i < items.length; i += 1) {
			relocate(i);
		}
	};

	if (leftWeight > rightWeight) {
		reinforceLeft();
		reinforceRight();
	} else {
		reinforceRight();
		reinforceLeft();
	}

	return result;
};
