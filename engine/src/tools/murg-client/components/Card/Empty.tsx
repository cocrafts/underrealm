import type { FC } from 'react';
import { Box } from 'ink';
import BigText from 'ink-big-text';

interface Props {
	index?: number;
	width: number;
}

export const EmptyCard: FC<Props> = ({ index, width }) => {
	const position = index !== undefined ? String(index) : '?';

	return (
		<Box
			width={width}
			borderColor="gray"
			borderStyle="round"
			alignItems="center"
			justifyContent="center"
		>
			<BigText text={position} colors={['gray', 'gray']} />
		</Box>
	);
};

export default EmptyCard;
