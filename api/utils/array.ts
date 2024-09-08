export const chunk = <T>(items: T[], size: number): Array<T[]> => {
	return items.reduce((arr, item, i) => {
		return i % size === 0
			? [...arr, [item]]
			: [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
	}, []);
};
