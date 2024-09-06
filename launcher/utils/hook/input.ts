import { useState } from 'react';
import { formatNumber } from 'utils/helper';

interface UseInput {
	value: string;
	onChangeText: (next: string) => void;
}

interface NumberInputConfigs {
	minValue?: number;
	maxValue?: number;
}

export const useInput = (initialValue = ''): UseInput => {
	const [value, setValue] = useState<string>(initialValue);

	return {
		value,
		onChangeText: (next) => setValue(next),
	};
};

export const useNumberInput = (
	initialValue = '',
	configs?: NumberInputConfigs,
): UseInput => {
	const maxValue = configs?.maxValue;
	const minValue = configs?.minValue;
	const [value, setValue] = useState<string>(initialValue);

	const onChangeText = (value: string) => {
		const parsedValue = parseInt(value.replace(/,/g, ''));

		if (maxValue && parsedValue > maxValue) {
			setValue(formatNumber(maxValue));
		} else if (minValue && parsedValue < minValue) {
			setValue(formatNumber(minValue));
		} else {
			setValue(formatNumber(parsedValue));
		}
	};

	return {
		value,
		onChangeText,
	};
};
