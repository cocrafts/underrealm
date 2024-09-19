import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const useBreakpoints = () => {
	const { width } = useWindowDimensions();
	return useMemo(
		() => ({
			mobileScreen: width < 640,
		}),
		[width],
	);
};
