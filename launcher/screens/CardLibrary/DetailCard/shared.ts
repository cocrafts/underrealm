export const getRarity = (level: number): string => {
	if (level > 12) {
		return 'Immortal';
	} else if (level > 9) {
		return 'Legendary';
	} else if (level > 6) {
		return 'Mythical';
	} else if (level > 3) {
		return 'Epic';
	}

	return 'Rare';
};
