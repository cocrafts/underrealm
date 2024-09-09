import type { FC } from 'react';
import { Box, Text } from 'ink';

type AttributePair = [origin: number, current: number, future?: number];

interface Props {
	pair: AttributePair;
}

export const Attribute: FC<Props> = ({ pair }) => {
	const [origin, current, future] = pair;
	const originDiff = current - origin;
	const predictDiff = future - current;
	const currentIcon = current > origin ? '↑' : '↓';
	const dynamicColor = extractColor(origin, current);

	return (
		<Box width="33%" flexDirection="column" alignItems="center">
			<Text color={dynamicColor}>
				{current}
				{originDiff > 0 && currentIcon}
			</Text>
			<Text color="gray">{predictDiff !== 0 ? `${predictDiff}` : '.'}</Text>
		</Box>
	);
};

export default Attribute;

const extractColor = (before: number, after: number) => {
	if (before === after) {
		return 'white';
	} else if (before < after) {
		return 'green';
	} else {
		return 'red';
	}
};
