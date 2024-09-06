import { StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import type { ScaledSizes } from '@metacraft/ui';
import type { HoveredStyleFunc } from 'components/Marketplace/Button/shared';
import { iStyles } from 'utils/styles';

export const headingSize = [35] as ScaledSizes;

export interface ContentType {
	intro: string;
	concepts: {
		label: string;
		icon: number;
		description: string;
		image?: number;
		additional?: {
			title: string;
			text: string;
		}[];
	}[];
}

export const useHoveredStyle: HoveredStyleFunc = (isHovered) =>
	useAnimatedStyle(() => {
		return {
			opacity: withTiming(isHovered.value ? 0.5 : 1, { duration: 250 }),
		};
	}, [isHovered]);

export const sharedStyle = StyleSheet.create({
	sectionContainer: {
		alignItems: 'center',
		...iStyles.wideContainer,
		paddingHorizontal: 15,
		paddingBottom: 80,
	},
	heading: {
		fontFamily: 'Volkhov',
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
	},
	subHeading: {
		maxWidth: 1100,
		paddingVertical: 40,
		color: '#fff',
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
	textShadow: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		textShadow: '0 0 10px black',
	},
	subContent: {
		maxWidth: 800,
		paddingVertical: 40,
		paddingHorizontal: 15,
		color: '#fff',
	},
});
