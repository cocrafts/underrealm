import type { Vec3 } from 'cc';

type CalculateIndexPositionOptions = {
	index: number;
	total: number;
	centerPosition: Vec3;
	offset?: number;
};

export const calculateIndexPosition = ({
	index,
	total,
	centerPosition,
	offset = 40,
}: CalculateIndexPositionOptions): Vec3 => {
	const centerIndex = Math.floor(total / 2);
	const totalXOffset = (index - centerIndex) * offset;
	const playerHandPosition = centerPosition.clone();
	const position = playerHandPosition.add3f(totalXOffset, 0, index);

	return position;
};
