import { Platform, StyleSheet } from 'react-native';
import { UnistylesRegistry } from 'react-native-unistyles';
import type { ThemeState } from '@metacraft/ui';

export const iStyles = StyleSheet.create({
	wideContainer: {
		width: '100%',
		maxWidth: 2600,
		marginHorizontal: 'auto',
	},
	contentContainer: {
		width: '100%',
		maxWidth: 1600,
		marginHorizontal: 'auto',
	},
});

export const noSelect = Platform.select({
	web: { userSelect: 'none' },
	default: {},
});

export const launcherTheme: ThemeState = {
	id: 'launcher',
	dark: true,
	defaultFontSize: 14,
	defaultFontFamily: 'Poppins',
	colors: {
		primary: '#351f1f',
		secondary: '#EB5757',
		background: '#0d1117',
		card: '#FFFFFF',
		border: '#D8D8D8',
		notification: '#FF3B30',
		text: '#FFFFFF',
		link: '#58A6FF',
		altText: '#222222',
		alt: '#545d6c',
	},
	sizes: {
		topNavigation: 70,
		leftNavigation: 280,
	},
};

const breakpoints = {
	xs: 0,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200,
	superLarge: 2000,
	tvLike: 4000,
} as const;

type AppBreakpoints = typeof breakpoints;

type AppThemes = {};

declare module 'react-native-unistyles' {
	export interface UnistylesBreakpoints extends AppBreakpoints {}
	export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints);
