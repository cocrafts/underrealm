import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import Block from './Block';

interface Props {
	style?: ViewStyle;
	blockCount?: number;
	endTime: Date;
}

export const Countdown: FC<Props> = ({ blockCount = 4, endTime, style }) => {
	const [blocks, setBlocks] = useState(getTimeDiffs(endTime));
	const slicedBlocks = blocks.slice(0, blockCount);

	useEffect(() => {
		const interval = setInterval(() => {
			setBlocks(getTimeDiffs(endTime));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<View style={[styles.container, style]}>
			{slicedBlocks.map((item, i) => (
				<Block key={i} firstItem={i === 0} item={item} />
			))}
		</View>
	);
};

export default Countdown;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
});

const dayQuantity = 1000 * 60 * 60 * 24;
const hourQuantity = 1000 * 60 * 60;
const minuteQuantity = 1000 * 60;
const secondQuantity = 1000;

const padNumber = (value: number, length = 2) => {
	let result = String(value);
	const stringType = String(value);
	if (stringType.length > length) return value;

	for (let i = stringType.length; i < length; i += 1) {
		result = `0${result}`;
	}

	return result;
};

const getTimeDiffs = (endTime: Date) => {
	const millisecondsLeft = endTime.getTime() - new Date().getTime();
	const dayAmount = millisecondsLeft / dayQuantity;
	const hourPart = millisecondsLeft % dayQuantity;
	const hourAmount = hourPart / hourQuantity;
	const minutePart = hourPart % hourQuantity;
	const minuteAmount = minutePart / minuteQuantity;
	const secondPart = minutePart % minuteQuantity;
	const secondAmount = secondPart / secondQuantity;

	return [
		{ title: 'days', value: padNumber(Math.floor(dayAmount)) },
		{ title: 'hours', value: padNumber(Math.floor(hourAmount)) },
		{ title: 'mins', value: padNumber(Math.floor(minuteAmount)) },
		{ title: 'secs', value: padNumber(Math.floor(secondAmount)) },
	];
};
